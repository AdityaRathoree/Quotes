import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import React,{useState,useEffect} from 'react';
import { getQuoteById,editQuote,getAllCategories } from "../Services/axiosapi";
import { Link,useNavigate,Params, useParams } from "react-router-dom";
import './AddQuote.css';
import NavigationBar from "./NavigationBar";

function EditQuote(){

  const [pretext, setpreText] = useState('');
  const [preauthor, setpreAuthor] = useState('');
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
   
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
      loadBlog();
    }, []);

    useEffect(() => {
      loadCategory();
    }, []);

    const loadCategory = async () => {
      let response = await getAllCategories();
      // console.log(response.data.data);
      setCategory(response.data.data);
    };

    // useEffect(() => {
    // }, [quote]);

    const loadBlog = async () => {
      console.log("params :"+id);
      let response = await getQuoteById(id);
      // if(response && response.status === 200){
      // console.log(response.data[0].text);
      setQuote(response.data.data[0].text)
      setAuthor(response.data.data[0].author)
      // }
    };

    const handleEditQuote = async () => {
      
        let response = await editQuote(quote,author,id,selectedCategory);

        console.log(response);
        if (response.data.data.affectedRows >= 1) {
          toast.success(`Quote Edited Succesfully!!!`)
          navigate('/home');
        } else {
          toast.error('Invalid entry')
        }
    }

    return(
        <>
        {/* <NavigationBar/> */}
        <div id="" style={{margin:"100px", justifyContent: 'center', textAlign: 'center' }}>
         <div className="col-12 justify-content-center">
      <h1>Edit Quotes</h1>
      <div>
        <label>Quote:</label>
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Enter your quote"
          rows={4}
          cols={50}
        />
      </div>

      <div>
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {category.map((w, index) => (
                <option key={index} value={w.id}>
                  {w.category}
                </option>
              ))}
            </select>
          </div><br/>

      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter the author"
        />
      </div>
      <button className="btn btn-primary" onClick={handleEditQuote}>Edit Quote</button>
    </div>
    </div>
        </>
    )
}

export default EditQuote;