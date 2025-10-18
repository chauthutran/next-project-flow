import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | ProjectFlow',
    description:
        'Learn more about ProjectFlow — a modern project management platform built for teams to collaborate, plan, and achieve goals efficiently.',
    keywords: [
        'project management',
        'team collaboration',
        'task tracking',
        'Next.js app'
    ],
    openGraph: {
        title: 'About ProjectFlow',
        description:
            'Discover ProjectFlow, a powerful project management platform for modern teams.',
        url: 'https://yourdomain.com/about-us',
        siteName: 'ProjectFlow',
        images: [
            {
                url: 'https://yourdomain.com/images/about-banner.png',
                width: 1200,
                height: 630,
                alt: 'ProjectFlow team collaboration'
            }
        ],
        locale: 'en_US',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About ProjectFlow',
        description:
            'Discover ProjectFlow, a powerful project management platform for modern teams.',
        images: ['https://yourdomain.com/images/about-banner.png']
    }
};

export default function AboutUsPage() {
    return (
        <main className="max-w-5xl mx-auto p-6 md:p-12 bg-[var(--card)] space-y-12">
            {/* Header */}
            <header>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                    About <span className="text-blue-600">ProjectFlow</span>
                </h1>
                <p className="leading-relaxed max-w-3xl mx-auto mb-4">
                    ProjectFlow is a modern project management platform designed
                    to help teams plan, track, and deliver work more efficiently.
                    Our mission is to simplify project workflows while maintaining
                    flexibility for developers and managers.
                </p>
                <p className="leading-relaxed max-w-3xl mx-auto">
                    Built with <strong>Next.js</strong>, <strong>React</strong>, and
                    <strong> Tailwind CSS</strong>, ProjectFlow combines performance,
                    scalability, and elegant UI to deliver a seamless experience
                    for managing projects, tasks, and milestones.
                </p>
            </header>

            {/* Core Features */}
            <section>
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-500 inline-block pb-2">
                    🚀 Core Features
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                    {[
                        {
                            title: '🔐 User Authentication',
                            desc: 'Securely sign up, log in, and manage your account. Role-based access ensures only authorized users can view or edit project data.',
                        },
                        {
                            title: '📊 Dashboard Overview',
                            desc: 'Get real-time insight into your projects, tasks, and team activities — helping you stay organized and productive.',
                        },
                        {
                            title: '🗂️ Project Management',
                            desc: 'Create, organize, and track projects effortlessly. Manage descriptions, deadlines, assigned members, and milestones with ease.',
                        },
                        {
                            title: '✅ Task Management',
                            desc: 'Break projects down into actionable tasks. Assign, prioritize, and update progress with intuitive task boards.',
                        },
                        {
                            title: '📅 Meeting Scheduler',
                            desc: 'Plan and organize meetings directly inside your workspace. Add participants, agendas, and video call links with calendar integration.',
                        },
                        {
                            title: '🏁 Milestone Tracking',
                            desc: 'Define clear milestones to measure progress. Stay focused on key deliverables and visualize success as you go.',
                        },
                        {
                            title: '📈 Reports & Analytics',
                            desc: 'Generate visual reports to monitor productivity and performance. Export insights to PDF or CSV for reviews and presentations.',
                        },
                        {
                            title: '💬 Team Collaboration',
                            desc: 'Collaborate in real-time through comments, file sharing, and activity logs — keeping everyone aligned and informed.',
                        },
                        {
                            title: '⚙️ Customizable Settings',
                            desc: 'Personalize your workspace with theme preferences, profile settings, and notification options tailored to your workflow.',
                        },
                        {
                            title: '💡 Technology Stack',
                            desc: 'Powered by Next.js, React, and Tailwind CSS — with server components, SSR, and API routes ensuring high performance and scalability.',
                        },
                        {
                            title: '🌐 Future Enhancements',
                            desc: 'We’re evolving rapidly — upcoming features include AI-powered task recommendations, smart notifications, and Gantt chart views.',
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="p-5 bg-blue-50 border border-blue-200 rounded-xl hover:shadow-md transition"
                        >
                            <h3 className="font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Vision */}
            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    🧠 Our Vision
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    At ProjectFlow, our mission is to simplify project management
                    without sacrificing flexibility. We empower teams with
                    intuitive, data-driven tools that enable them to collaborate
                    effectively and deliver meaningful results.
                </p>
            </section>

            {/* About Developer */}
            <section className="">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2 inline-block">
                    👨‍💻 About the Developer
                </h2>
                <p className="text-gray-700 mb-4">
                    Hi, I’m <strong className="text-gray-900">Chau Thu Tran</strong>,
                    the developer behind ProjectFlow. This application showcases
                    my passion for creating clean, efficient, and user-friendly web
                    tools that blend design and functionality seamlessly.
                </p>
                <a
                    href="https://chauthutran.neocities.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 font-medium hover:underline hover:text-blue-800 transition"
                >
                    🌐 Visit My Personal Portfolio
                </a>
            </section>
        </main>
    );
}
