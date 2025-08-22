interface Breadcrumbs {
    items: Array<{
        title: string;
        href: string;
    }>;
}

export function Breadcrumb({ items }: Breadcrumbs) {
    console.log("Breadcrumb items:", items);
    return (
        <nav aria-label="breadcrumb">
            <ol className="flex space-x-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center lowercase">
                        {index > 0 && <span className="mx-1">/</span>}
                        <a href={item.href} className="text-neutral-600 hover:underline">
                            {item.title}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    )
}