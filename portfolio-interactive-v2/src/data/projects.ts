export interface Project {
    id: number;
    title: string;
    slug: string;
    category: string;
    tech: string[];
    image: string;
    size: 'large' | 'tall' | 'normal';
    // Detail fields
    description: string;
    role: string;
    year: string;
    link: string;
    challenge: string;
    solution: string;
    gallery?: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Synapse AI",
        slug: "synapse-ai",
        category: "Web Application",
        tech: ["React", "Stable Diffusion", "Node.js"],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY-pyxv8PMm5V8vFpvu6hKw5PIHW2cQmrszQ9qON-pIJnhqWhj7riHGBVXRO9laVutuB6wUtIFIYvtZkhmAroI0onEO5tbfXFgqdVpHmq1FA47RKJfNlKuK6XQaw99fZY0JforzoTdIgCYGxIgKPTvsmzqxq4Oi3G2z14Vb2Xf__-9k0XO4X8Myel1RGg2uNBa1cIwshKNzYomZgiJCNOKUIHWqKZt5c0XlJ4H9m34WdgNuC_GzGzF4qxHwsMrBseKdFkgNkZ6bg",
        size: "large",
        description: "A revolutionary platform bridging the gap between human creativity and artificial intelligence. Synapse AI allows users to generate, edit, and refine digital art using advanced Stable Diffusion models with a highly intuitive interface.",
        role: "Lead Frontend Engineer",
        year: "2024",
        link: "https://synapse-ai.demo",
        challenge: "The primary challenge was handling real-time image generation and manipulation without freezing the UI. We needed a way to manage complex state and WebSocket connections for progress updates while maintaining a buttery-smooth 60fps experience for the user.",
        solution: "We implemented a custom optimistic UI pattern paired with Web Workers to handle heavy processing off the main thread. The interface uses React Three Fiber for 3D visualization of the generation process, creating an immersive experience that keeps users engaged during wait times."
    },
    {
        id: 2,
        title: "EcoMarket",
        slug: "eco-market",
        category: "E-Commerce Platform",
        tech: ["Shopify Headless", "Next.js", "Tailwind"],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd9twZg62mr6IWbwJq4H9t6Mx7uldtrdFk2GcglY5IB2PfybZo32asVaz_T65N3uCmJDiMtqtDZdww1T_Zghdon4OkwsHxp7146ibDcb3Aju3aP4XmsQNhBDBt_t7xA7uFgwfu2SRmskndWKeyXFEEiVelGVm9BMgRbqJR8n3uwNaaljcOpGi5vM3C2XZNCnXgcJo7uWa-c3daI-KZS6aeeM1jVtKpcAkQcVWrLg86l4j8VjPVFJhSKv85M2NqISemqf-P1dEYzg",
        size: "normal",
        description: "A sustainable shopping experience built for the modern conscious consumer. EcoMarket transforms the traditional e-commerce feel into a storytelling journey, highlighting the environmental impact of every purchase.",
        role: "Full Stack Developer",
        year: "2023",
        link: "https://ecomarket.demo",
        challenge: "Traditional Shopify themes felt too rigid for the client's vision of 'story-driven commerce'. They wanted seamless transitions between content and products, with zero load times between pages.",
        solution: "We utilized Shopify's Hydrogen framework combined with Next.js to build a headless storefront. This allowed us to pre-fetch product data and implement 'page transitions' that feel like a native app. The result is a 40% increase in conversion rates due to the frictionless UX."
    },
    {
        id: 3,
        title: "DataViz Pro",
        slug: "datavix-pro",
        category: "Analytics Dashboard",
        tech: ["D3.js", "Vue 3", "Firebase"],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1xhvEnd7AudSAF-ZEzerdYAW0f6AQkhy96MS_yx_TAJVgQqz-o7Ni_ZBoiaKxx4Jj6_8yitPGGWX5H8r7fb21F-PdMeqIXNrEjla4URrJjVMre3GXiGwfA7vpbVCK3VM5RzOtaQbBgyP9hGQPkxhT5YA_q0PgLr96naIh_WiBqUSituGCpCWgkWl-X9hyd30VeGD8wxMFE51u35-4EeJ6Ha3KTaeZsvoxlSkbUWl3tzTIU-VjDw8Qc37W0yu-E10G-kCnqmFN2A",
        size: "tall",
        description: "Transforming raw data into actionable insights through stunning interactive visualizations. DataViz Pro is designed for C-level executives who need to understand complex metrics at a glance.",
        role: "Frontend Architect",
        year: "2023",
        link: "#",
        challenge: "Rendering thousands of data points on a map without crashing the browser was the main hurdle. The client needed real-time filtering and zooming capabilities for a dataset of over 50,000 entities.",
        solution: "We leveraged D3.js combined with HTML5 Canvas for the heavy lifting, bypassing the DOM for the data points themselves. Vue 3's reactivity system handled the UI controls, updating the Canvas render cycle efficiently. The result is a dashboard that feels alive and responsive."
    },
    {
        id: 4,
        title: "Portfolio V1",
        slug: "portfolio-v1",
        category: "Personal Website",
        tech: ["HTML5", "SCSS", "Vanilla JS"],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDfACwubrucnWSBTNHMGFstlYcw3MKTQ0HelfH6-m3WET-mN0FumQOs5GAVhDwcmUctUPsiuiFuNl6eVI5UpkpXtDDcqcMzIwaBrHcmu-cqwNhAU9VFm5gAvc6YC4ljOBB1A-T0j0h0nXZvsDHkREucGqDxB11Hedi8DlHZS8NU6rzxgWlbAUFR-Dfh3XS1igm5T7XUe2IcTpaVTva-qB4_gf4wF9kRzES1_YBYKQ4Kcq5DyuWMBDqBPfARun0PRJeOPhfEUpQxA",
        size: "normal",
        description: "My first foray into creating a digital identity. While simple, it established the 'clean yet complex' aesthetic that defines my work today.",
        role: "Designer & Dev",
        year: "2022",
        link: "#",
        challenge: "Learning how to manage CSS scalability without a framework like Tailwind.",
        solution: "I implemented a strict BEM methodology and SCSS modules, which taught me the importance of architecture even in small projects."
    },
    {
        id: 5,
        title: "Lumina UI",
        slug: "lumina-ui",
        category: "Design System",
        tech: ["Figma", "React", "Storybook"],
        image: "https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        size: "normal",
        description: "A comprehensive design system built for scalability and consistency across multiple enterprise products. Lumina UI prioritizes accessibility and developer experience.",
        role: "UI Engineer",
        year: "2024",
        link: "#",
        challenge: "Creating a system that is flexible enough for different brand identities but rigid enough to maintain consistency.",
        solution: "We used CSS Variables and Design Tokens to create a 'theming engine'. This allows a single codebase to power 4 different products with completely different visual styles simply by swapping the token values."
    }
];
