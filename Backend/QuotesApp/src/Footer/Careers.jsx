import './Careers.css';

function Careers(){
return(
<>
<div className="careers">
    <center>
      <h1>Careers at Quote Verse</h1></center>
      <div style={{margin:"20px"}}>
      <p>
        Join our team and be a part of the Quote Verse family. We are constantly looking for passionate and talented individuals to help us grow and succeed in the world of Quotes.
      </p>
      <h4>Explore Opportunities</h4>
      <ul>
        <li>
          <strong>Opportunities for students</strong>
          <p>Learn about, search for, and apply to internships and full-time opportunities for students.</p>
          <button className="btn btn-dark">View Open jobs</button>
        </li>
        <br/>
        <li>
          <strong>Software Development</strong>
          <p>Explore job opportunities and what it's like to be a software engineer at Quote Verse</p>
          <button className="btn btn-dark">View Open jobs</button>
        </li>
        {/* Add more job listings here */}
      </ul>
      <p>
        If you are interested in any of our job openings or would like to inquire about career opportunities at Quote Verse, please contact our HR department at careers@quoteverse.com.
      </p>
      </div>
    </div>
</>
);
}

export default Careers