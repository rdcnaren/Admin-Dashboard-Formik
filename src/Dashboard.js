import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
// import '../node_modules/bootstarp/dist/'

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddBook = (values, actions) => {
    if (editIndex === -1) {
      setBooks([...books, values]);
    } else {
      const updatedBooks = [...books];
      updatedBooks[editIndex] = values;
      setBooks(updatedBooks);
      setEditIndex(-1);
    }
    actions.resetForm();
  };

  const handleEditBook = (index) => {
    setEditIndex(index);
    
  
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };
const color ={
        color:"black",
    textAlign:"center"
}
  return (
    <div className="container">
      <h1 className="mt-5" style={color}>Admin Dashboard</h1>
      <Formik
        initialValues={{
          title: '',
          author: '',
          isbn: '',
          publicationDate: ''
        }}
        validate={(values) => {
          const errors = {};

          if (!values.title) {
            errors.title = 'Title is required';
          }

          if (!values.author) {
            errors.author = 'Author is required';
          }

          // Add additional validations for other fields if needed

          return errors;
        }}
        onSubmit={handleAddBook}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <Field type="text" id="title" name="title" className="form-control" />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <Field type="text" id="author" name="author" className="form-control" />
              <ErrorMessage name="author" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="isbn" className="form-label">ISBN</label>
              <Field type="text" id="isbn" name="isbn" className="form-control" />
              <ErrorMessage name="isbn" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="publicationDate" className="form-label">Publication Date</label>
              <Field type="date" id="publicationDate" name="publicationDate" className="form-control" />
              <ErrorMessage name="publicationDate" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {editIndex === -1 ? 'Add Book' : 'Update Book'}
            </button>
          </Form>
        )}
      </Formik>

      <h2 className="mt-5">Books</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Publication Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.publicationDate}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEditBook(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteBook(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;



