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
        <Form className="w-full flex flex-col items-center">
          <div className="w-full">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Title
            </label>
            <Field
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="title"
              name="title"
              type="text"
              disabled={isSubmitting}
            />
            <ErrorMessage
              className="mt-2 text-sm text-red-600"
              name="title"
              component="div"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="author"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Author
            </label>
            <Field
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="author"
              name="author"
              type="text"
              disabled={isSubmitting}
            />
            <ErrorMessage
              className="mt-2 text-sm text-red-600"
              name="author"
              component="div"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Price
            </label>
            <Field
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="price"
              name="price"
              type="number"
              disabled={isSubmitting}
            />
            <ErrorMessage
              className="mt-2 text-sm text-red-600"
              name="price"
              component="div"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Image
            </label>
            <Field
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="image"
              name="image"
              type="text"
              disabled={isSubmitting}
            />
            <ErrorMessage
              className="mt-2 text-sm text-red-600"
              name="image"
              component="div"
            />
          </div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none mt-6 "
            type="submit"
            disabled={isSubmitting}
          >
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
    <div className="w-full max-w-lg flex flex-col items-center ">
      <h2 className="text-xl text-center mb-0">Create Item Form</h2>
      <CreateItemFormPresentational onSubmit={createItem} />
      {status === "loading" && <p className="text-sm">Creating item</p>}
      {status === "success" && (
        <p className="text-sm text-green-400">Item created successfuly</p>
      )}
    </div>
  );
};

export default CreateItemFormContainer;
