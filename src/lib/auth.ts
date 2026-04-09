import { supabase } from '@/lib/supabase';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

/**
 * Auth Service - إدارة المصادقة والأمان
 */
export const authService = {
  /**
   * تسجيل مستخدم جديد
   */
  async signUp(email: string, password: string, fullName?: string): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      return {
        data: data.user as unknown as User,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  },

  /**
   * تسجيل الدخول
   */
  async signIn(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return {
        data: data.user as unknown as User,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  },

  /**
   * تسجيل الخروج
   */
  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  },

  /**
   * الحصول على المستخدم الحالي
   */
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user as unknown as User;
  },

  /**
   * إعادة تعيين كلمة المرور
   */
  async resetPassword(email: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      return {
        data: null,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  },
};

/**
 * Generic Database Service - عمليات قاعدة البيانات العامة
 */
export const dbService = {
  /**
   * جلب بيانات من جدول معين
   */
  async fetch<T>(tableName: string, options?: {
    select?: string;
    filter?: { column: string; value: any };
    limit?: number;
  }): Promise<ApiResponse<T[]>> {
    try {
      let query = supabase.from(tableName).select(options?.select || '*');

      if (options?.filter) {
        query = query.eq(options.filter.column, options.filter.value);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      return {
        data: data as T[],
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  },

  /**
   * إضافة سجل جديد
   */
  async insert<T>(tableName: string, record: Partial<T>): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert(record)
        .select()
        .single();

      if (error) throw error;

      return {
        data: data as T,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  },

  /**
   * تحديث سجل موجود
   */
  async update<T>(
    tableName: string,
    id: string,
    updates: Partial<T>
  ): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        data: data as T,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  },

  /**
   * حذف سجل
   */
  async delete(tableName: string, id: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      return {
        data: null,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  },
};
