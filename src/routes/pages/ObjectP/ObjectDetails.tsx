import { useParams } from "react-router";

export default function ObjectDetails() {
    const ObjectPId = useParams<{ ObjectPId: string }>();
    return <h1>{ObjectPId.ObjectPId}</h1>;
}
