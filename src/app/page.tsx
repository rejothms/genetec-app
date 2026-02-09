import { EventDashboard } from '@/components/EventDashboard/EventDashboard';

import { EventItem } from '@/types/events';
import { Suspense } from 'react';
import LoadingSpinner from './loading';
import { redirect } from 'next/navigation';


export default async function Home() {
 redirect("/dashboard");
}

