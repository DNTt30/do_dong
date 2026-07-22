'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Users, ShoppingCart, DollarSign, ArrowRight, TrendingUp, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ROUTES } from '@/constants/routes';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { format, subDays, startOfDay, isSameDay } from 'date-fns';
import { vi } from 'date-fns/locale';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
}

interface OrderData {
  id: string;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

// Colors for Pie Chart (Status)
const STATUS_COLORS = {
  new: '#3b82f6', // blue
  processing: '#f59e0b', // amber
  shipping: '#8b5cf6', // purple
  completed: '#10b981', // green
  cancelled: '#ef4444', // red
};

const STATUS_LABELS: Record<string, string> = {
  new: 'Mới',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({ totalRevenue: 0, totalOrders: 0, totalCustomers: 0, totalProducts: 0 });
  const [recentOrders, setRecentOrders] = useState<OrderData[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // 1. Fetch Products Count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // 2. Fetch Orders Count
      const { count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      // 3. Fetch Completed Orders totalAmount for revenue aggregation
      const { data: completedOrders } = await supabase
        .from('orders')
        .select('totalAmount')
        .eq('status', 'completed');
      const revenue = completedOrders?.reduce((sum, o) => sum + Number(o.totalAmount), 0) || 0;

      // 4. Fetch all customer phones to count unique customers
      const { data: customerPhones } = await supabase
        .from('orders')
        .select('customerPhone');
      const uniqueCustomers = new Set(customerPhones?.map(o => o.customerPhone) || []).size;

      setStats({
        totalRevenue: revenue,
        totalOrders: ordersCount || 0,
        totalCustomers: uniqueCustomers,
        totalProducts: productsCount || 0,
      });

      // 5. Fetch completed orders from the last 7 days for the chart
      const startDate = subDays(startOfDay(new Date()), 6).toISOString();
      const { data: chartOrders } = await supabase
        .from('orders')
        .select('totalAmount, createdAt')
        .eq('status', 'completed')
        .gte('createdAt', startDate);

      const last7Days = Array.from({ length: 7 }).map((_, i) => subDays(new Date(), 6 - i));
      const chartData = last7Days.map(date => {
        const dayOrders = (chartOrders || []).filter(o => isSameDay(new Date(o.createdAt), date));
        const dayRevenue = dayOrders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
        return {
          date: format(date, 'dd/MM'),
          revenue: dayRevenue,
        };
      });
      setRevenueData(chartData);

      // 6. Fetch statuses of all orders for status distribution chart
      const { data: statusesData } = await supabase
        .from('orders')
        .select('status');
      const statusCounts: Record<string, number> = {};
      (statusesData || []).forEach(o => {
        statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
      });
      const pieData = Object.keys(statusCounts).map(key => ({
        name: STATUS_LABELS[key] || key,
        value: statusCounts[key],
        color: STATUS_COLORS[key as keyof typeof STATUS_COLORS] || '#ccc',
      }));
      setStatusData(pieData);

      // 7. Fetch only 5 most recent orders for dashboard table
      const { data: recentOrdersData } = await supabase
        .from('orders')
        .select('id, customerName, totalAmount, status, createdAt')
        .order('createdAt', { ascending: false })
        .limit(5);
      setRecentOrders((recentOrdersData || []) as OrderData[]);

    } catch (err) {
      console.error('Dashboard stats error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const STAT_CARDS = [
    { label: 'Tổng Doanh Thu', value: `${stats.totalRevenue.toLocaleString('vi-VN')} ₫`, icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'Tổng Đơn Hàng', value: stats.totalOrders.toLocaleString('vi-VN'), icon: ShoppingCart, color: 'bg-blue-50 text-blue-600' },
    { label: 'Khách Hàng', value: stats.totalCustomers.toLocaleString('vi-VN'), icon: Users, color: 'bg-amber-50 text-amber-600' },
    { label: 'Sản Phẩm', value: stats.totalProducts.toLocaleString('vi-VN'), icon: Package, color: 'bg-purple-50 text-purple-600' },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Đang tải dữ liệu tổng quan...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Tổng quan hoạt động kinh doanh</p>
        </div>
        <Link href={ROUTES.ADMIN.PRODUCT_NEW} className="btn-primary flex items-center gap-2">
          <Package size={16} /> Thêm sản phẩm
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{card.label}</p>
              <h3 className="text-2xl font-bold text-foreground truncate">{card.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart: Revenue */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-6">Doanh Thu 7 Ngày Gần Nhất</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                  dx={-10}
                />
                <Tooltip 
                  formatter={(value: number | string | undefined | any) => [`${Number(value || 0).toLocaleString('vi-VN')} ₫`, 'Doanh thu']}
                  labelStyle={{ color: '#1f2937', fontWeight: 'bold', marginBottom: '8px' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f3f4f6' }}
                />
                <Bar dataKey="revenue" fill="#d4af37" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Status Distribution */}
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-foreground mb-2">Tỷ Lệ Đơn Hàng</h2>
          <p className="text-sm text-muted-foreground mb-6">Phân bổ theo trạng thái</p>
          <div className="flex-1 min-h-[250px] w-full flex items-center justify-center">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [value, 'Đơn hàng']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-sm text-muted-foreground">Chưa có dữ liệu đơn hàng</div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Đơn Hàng Mới Nhất</h2>
          <Link href={ROUTES.ADMIN.ORDERS} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            Xem tất cả <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Ngày đặt</th>
                <th className="px-6 py-4 font-medium">Tổng tiền</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    Chưa có đơn hàng nào.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(order.createdAt), 'HH:mm - dd/MM/yyyy')}
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">
                      {order.totalAmount.toLocaleString('vi-VN')} ₫
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ 
                        backgroundColor: `${STATUS_COLORS[order.status as keyof typeof STATUS_COLORS]}20`,
                        color: STATUS_COLORS[order.status as keyof typeof STATUS_COLORS]
                      }}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
