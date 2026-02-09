I created this project as an event management dashboard related to security and infrastructure. There are mainly three features: create event, dashboard with datagrid, and timeline view.
The dashboard displays a table showing all event details. Users are able to filter, search (by title), sort (by clicking on table headers), and edit or delete events. The edit functionality allows updating all fields and update the status of an event (by default, it is set to "planned" when creating a new event). The timeline view groups events by day and allows arrow key navigation using keyboard.
It uses server-managed APIs (I added a mock event JSON) and supports GET, POST, UPDATE, and DELETE operations for events. I created two reusable components, Datagrid and Timeline. These are completely independent components, with all styles and types inside the component folder. I used plain CSS for these components even though the rest of the application uses Tailwind, so reusable components( datagrid and timeline ) can be used outside of the application as a standalone plugin.
I also added accessibility attributes across components and pages, and implemented security validations for all inputs in the project.
Data management is mainly on the server side, there is no caching or local storage, but a global store is created on the server to manage the data. Routing is handled using the App Router of Next.js.

Technologies Used : 
Library and Framework: React and Next.js
Next.js version: 16
Language: TypeScript
CSS: Tailwind CSS and separate CSS for the reusable Datagrid and Timeline components
Other libraries:
react-hot-toast - for toast messages
@tanstack/react-virtual added for virtual scrolling in the timeline but not integrated. 

I added a .env file with the public path (currently localhost) and committed it to Git for running locally. and project pushed  to my personal repository of github 
https://github.com/rejothms/genetec-app

npm run dev — run locally
npm run build — create an optimized production build
npm run start — run the production build

_________________________________________

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
