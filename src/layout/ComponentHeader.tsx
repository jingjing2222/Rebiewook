type ComponentHeaderProps = {
    title: string;
};

export default function ComponentHeader({ title }: ComponentHeaderProps) {
    return (
        <>
            <h2 className="text-center text-3xl">{title}</h2>
            <hr />
        </>
    );
}
