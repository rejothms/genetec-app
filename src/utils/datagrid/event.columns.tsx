'use client'
import { Column } from '@/components/Datagrid/Datagrid.types';
import { EventItem } from '@/types/events';

type EventColumnHandlers = {
  onEdit: (row: EventItem) => void;
  onDelete: (row: EventItem) => void;
};

export const eventColumns = ({ onEdit, onDelete }: EventColumnHandlers): Column<EventItem>[] => [
  {
    key: 'title',
    label: 'Title',
    accessor: (row) => row.title,
    sortable: true,
    filtered: false,
    searchable: true
  },
  {
    key: 'owner',
    label: 'Owner',
    accessor: (row) => row.owner ?? '-',
    filtered: true
  },

  {
    key: 'Date',
    label: 'Date',
    accessor: (row) => {
      if (!row.startAt) return '-';

      return new Date(row.startAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour12: true,
      });
    },
    sortable: true,
    filtered: false
  },

  {
    key: 'startTime',
    label: 'Start',
    accessor: (row) => {
      if (!row.startAt) return '-';

      return new Date(row.startAt).toLocaleString('en-GB', {

        hour: '2-digit',
        minute: '2-digit',

      });
    },
    sortable: true,
    filtered: false,
    defaultSort: true
  },
  {
    key: 'endAt',
    label: 'End',
    accessor: (row) => {
      if (!row.endAt) return '-';

      return new Date(row.endAt).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'

      });
    },
    sortable: true,
    filtered: false
  },
  {
    key: 'status',
    label: 'Status',
    accessor: (row) => row.status,
    sortable: true,
    filtered: true
  },
  {
    key: 'priority',
    label: 'Priority',
    accessor: (row) => row.priority,
    sortable: false,
    filtered: true
  },
  {
    key: 'Delete',
    label: '',
    accessor: (row) => {
      return (
        <>
          <span className="material-icons text-[#0056b3] cursor-pointer" onClick={(e) => {
            e.stopPropagation();
            onEdit(row);
          }} aria-label='edit-event'>edit</span>
          <span className="material-icons text-[#E60000] cursor-pointer" onClick={(e) => {
            e.stopPropagation();
            onDelete(row);
          }} aria-label='delete-event'>delete</span>
        </>
      )
    }

  }


];
