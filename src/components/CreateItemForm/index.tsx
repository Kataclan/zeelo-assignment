import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { createListItem } from "../../api";

export const validationSchema = Yup.object({
  title: Yup.string().max(100, "Title should be 100 characters or less"),
  author: Yup.string().max(100, "Author should be 100 characters or less"),
  price: Yup.number().max(99999, "Price should be 99999 or less"),
  image: Yup.string().url("Image should be a valid URL"),
});

interface CreateItemFormProps {
  submitting?: boolean;
  onSubmit?: (values: ListItemDetails) => void;
}

export const CreateItemFormPresentational: React.FC<CreateItemFormProps> = ({
  onSubmit = () => {},
}) => {
  return (
    <Formik
      initialValues={{ title: "", author: "", price: 0, image: "" }}
      validationSchema={validationSchema}
      onSubmit={(values: ListItemDetails) => {
        onSubmit(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field
              id="title"
              name="title"
              type="text"
              disabled={isSubmitting}
            />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <Field
              id="author"
              name="author"
              type="text"
              disabled={isSubmitting}
            />
            <ErrorMessage name="author" component="div" />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <Field
              id="price"
              name="price"
              type="number"
              disabled={isSubmitting}
            />
            <ErrorMessage name="price" component="div" />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <Field
              id="image"
              name="image"
              type="text"
              disabled={isSubmitting}
            />
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

const CreateItemFormContainer = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const createItem = async (details: ListItemDetails) => {
    try {
      setStatus("loading");
      const response = await createListItem(details);
      setStatus("success");
    } catch (err: any) {}
  };

  return (
    <div>
      <CreateItemFormPresentational onSubmit={createItem} />
      {status === "loading" && <p>Loading</p>}
      {status === "success" && <p>Item created successfuly</p>}
    </div>
  );
};

export default CreateItemFormContainer;
