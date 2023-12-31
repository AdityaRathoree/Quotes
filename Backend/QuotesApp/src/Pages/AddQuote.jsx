import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { addQuote, getAllCategories } from "../Services/axiosapi";
import { useNavigate } from "react-router-dom";
// import './AddQuote.css';

function AddQuote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadCategory();
  }, []);

  useEffect(() => {
  }, [category]);

  const loadCategory = async () => {
    let response = await getAllCategories();
    setCategory(response.data.data);
  };

  const handleAddQuote = async () => {
    let response = await addQuote(quote, author,selectedCategory);
    if (response.data.data.affectedRows >= 1) {
      toast.success(`Quote added Succesfully!!!`);
      navigate("/home");
    } else {
      toast.error("Invalid entry");
    }
  };

  return (
    <>
      {/* <NavigationBar/> */}
      <div
        id=""
        style={{
          margin: "100px",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div className="col-12 justify-content-center">
          <h1>Add Quotes</h1>
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
          <button className="btn btn-primary" onClick={handleAddQuote}>
            Add Quote
          </button>
        </div>
      </div>
    </>
  );
}

export default AddQuote;
