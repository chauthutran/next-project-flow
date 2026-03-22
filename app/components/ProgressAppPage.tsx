"use client";

import NProgress from "nprogress";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProgressAppPage() {
    const pathname = usePathname();
    
    useEffect(() => {
        NProgress.start();
        NProgress.done();
    
        return () => {
            NProgress.done();
        }
    }, [pathname]);
    
    return null;
}