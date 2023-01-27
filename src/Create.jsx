import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("emmy");
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault();
        const blog = {title, body, author};

        setIsPending(true);
        
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify(blog)
        }).then (() => {
            console.log("new blog added")
            setIsPending(false);
            // navigate.go(-1);
            navigate("/");
        })

    }


    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                  type="text" 
                  required
                  value= {title} 
                  onChange= {(event) => {setTitle(event.target.value)}}
                />
                
                <label>Blog author:</label>
                <select
                 value= {author}
                 onChange= {(event) => {setAuthor(event.target.value)}}
                >
                    <option value="emmy">emmy</option>
                    <option value="prince">prince</option>
                </select>
                
                <label>Blog body:</label>
                <textarea
                 required
                 value= {body}
                 onChange= {(event) => {setBody(event.target.value)}}
                ></textarea>

                { !isPending && <button>Add blog</button> }
                { isPending && <button disabled>Adding blog...</button> }
            </form>
        </div>
     );
}
 
export default Create;