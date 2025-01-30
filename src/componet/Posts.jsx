
import { useEffect, useState } from "react";
import { deletePost, getPost } from "../APi/PostApi";
import { Form } from "./Form";

export const Posts = () => {
    const [data, setData] = useState([]);
    const [updateApi,setUpdateApi]=useState({})
  
    const getPostData = async () => { // Fixed duplicate function declaration
        const res = await getPost();
        console.log(res.data);
        setData(res.data); 
        // Corrected to access `res.data`
    };

    useEffect(() => {
        getPostData();
    }, []);

    const handleDeletePost = async (id) => {
        try {
            const del = await deletePost(id);
            if (del.status === 200) {
                const newUpdatedPost = data.filter((curPost) => {
                    return curPost.id !== id;
                });
                setData(newUpdatedPost);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleUpadtePost=(curElem)=> setUpdateApi(curElem);

    return (
        <>
            <section className="section-form">
                <Form data={data} setData={setData} updateApi={updateApi}
                setUpdateApi={setUpdateApi} />
            </section>
            <section className="section-post">
                <ol>
                    {data.map((curElem) => {
                        const { id, body, title } = curElem;
                        return (
                            <li key={id}>
                                <p>{title}</p>
                                <p>{body}</p>
                                <button onClick={()=>
                                    handleUpadtePost(curElem)}
                                >Edit</button>
                                <button className="btn-delete" onClick={() => handleDeletePost(id)}>Delete</button>
                            </li>
                        );
                    })}
                </ol>
            </section>
        </>
    );
};
