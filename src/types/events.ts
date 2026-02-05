export enum EventStatus {
    PLANNED = 'planned',
    ACTIVE = 'active',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}


export enum EventPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'  
}


export enum EventOwner {
  SecurityOperations = 'security-operations',
  MonitoringTeam = 'monitoring-team',
  VideoSystems = 'video-systems',
  AccessControlTeam = 'access-control-team',
  Infrastructure = 'infrastructure',
  FieldOperations = 'field-operations',
  IdentityManagement = 'identity-management',
}


export interface EventItem {
    id: string;
    title: string;
    description?: string;
    startAt: string;
    endAt?: string;  
    owner: EventOwner;
    status: EventStatus;
    priority: EventPriority;
    createdAt: string;
   
}




export const STATUS_COLORS: Record<EventStatus, string> = {
  planned: '#FFC107',      // yellow
  active: '#4CAF50',       // green
  completed: '#9E9E9E',    // gray
  cancelled: '#F44336',    // red
};


export const PRIORITY_COLORS: Record<EventPriority, string> = {
  low: '#8BC34A',
  medium: '#FF9800',
  high: '#F44336',
};


export interface TimelineProps {
  events: EventItem[];
  onEventClick?: (event: EventItem) => void;
  renderEvent?: (event: EventItem) => React.ReactNode;
}






