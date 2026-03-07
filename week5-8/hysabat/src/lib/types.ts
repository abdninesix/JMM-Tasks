import type { ChartConfig } from "@/components/ui/chart";

// Login response
export type LoginResponse = {
    login: {
        token: string;
        userName: string;
        userId: string;
    };
};

// Main chart
export type StatLineChartProps = {
    icon: React.ReactNode
    title: string
    value: string
    data: { month: string; desktop: number }[]
    config: ChartConfig
}

// Customer
export type Customer = {
    id: number
    nameEnglish: string
    nameArabic: string
    contact: string
    email: string
    creditAmountLimit: number
    vATNo: string
    invoicesCount: number
}

export type CustomerQueryData = {
    customers: {
        nodes: Customer[];
    };
}

// Sale invoice
export type Invoice = {
    id: string
    customerName: string
    invoiceType: string
    totalItems: number
    grandTotal: number
    vatAmount: number
    issueDate: string
    paymentStatus: string
}

// Products
export type ApiProduct = {
    itemId: number;
    taxId: number;
    itemNameEnglish: string;
    wholeSellPrice: number;
    costPrice: number;
    barCode: string;
    category?: {
        categoryNameEnglish: string;
    };
    itemUnitOfMeasure?: Array<{
        nameEnglish: string;
        unitId: number;
    }>;
}

export type ProductQueryData = {
    items: {
        nodes: ApiProduct[];
    };
}

export type ProductQueryVariables = {
    search: string;
}

// Servcies
export type ApiService = {
    serviceId: number;
    taxId: number;
    serviceNameEnglish: string;
    price: number;
    costPrice: number;
    barCode: string;
    category?: {
        categoryNameEnglish: string;
    };
}

export type ServiceQueryData = {
    services: {
        nodes: ApiService[];
    };
}

export type ServiceQueryVariables = {
    search: string;
}

// Permissions
export type Permission = {
    id: string
    label: string
}

export type Module = {
    id: string
    label: string
    permissions: Permission[]
}