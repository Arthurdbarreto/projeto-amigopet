export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

export interface FieldConfig {
    name: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'date';
    required?: boolean;
    optionsKey?: string;
    optionLabel?: string;
    optionValue?: string;
    table?: boolean;
    currency?: boolean;
}

export interface CrudConfig {
    title: string;
    subtitle: string;
    resource: string;
    idField: string;
    icon: string;
    fields: FieldConfig[];
}

export interface DashboardSummary {
    totalPets: number;
    totalTutores: number;
    totalServicos: number;
    totalProdutos: number;
    agendamentosHoje: number;
}
