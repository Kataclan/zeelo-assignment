import { Formik, Form, Field, ErrorMessage } from "formik";
import { memo } from "react";
import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().max(100, "Title should be 100 characters or less"),
  author: Yup.string().max(100, "Author should be 100 characters or less"),
  price: Yup.number().max(99999, "Price should be 99999 or less"),
  image: Yup.string().url("Image should be a valid URL"),
});

interface ItemDetails {
  title: string;
  author: string;
  price: number;
  image: string;
}

interface CreateBookFormProps {
  onSubmit?: (values: ItemDetails) => void;
}

const CreateBookForm: React.FC<CreateBookFormProps> = ({
  onSubmit = () => {},
}) => {
  return (
    <Formik
      initialValues={{ title: "", author: "", price: 0, image: "" }}
      validationSchema={validationSchema}
      onSubmit={(values: ItemDetails) => {
        onSubmit(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label htmlFor="author">Author</label>

            <Field id="author" name="author" type="text" />
            <ErrorMessage name="author" component="div" />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <Field id="price" name="price" type="number" />
            <ErrorMessage name="price" component="div" />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <Field id="image" name="image" type="text" />
            <ErrorMessage name="image" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Create
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default memo(CreateBookForm);
