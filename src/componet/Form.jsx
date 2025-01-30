import { useEffect, useState } from "react";
import { PostData, updateData } from "../APi/PostApi";

export const Form = ({ data, setData, updateApi, setUpdateApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateApi).length === 0;

  useEffect(() => {
    updateApi &&
      setAddData({
        title: updateApi.title || "",
        body: updateApi.body || "",
      });
  }, [updateApi]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    const res = await PostData(addData);
    console.log("res", res);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  const updatePostData = async () => {
    try {
      // eslint-disable-next-line react/prop-types
      const res = await updateData(updateApi.id, addData);
      console.log(res);
      if (res.status === 201) {
        setData((prev) =>
          prev.map((curElem) =>
            curElem.id === res.id ? res.data : curElem
          )
        );

        setUpdateApi({});
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="ADD TITLE"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body">Post:</label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="ADD POST"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "EDIT"}>
        {isEmpty ? "Add" : "EDIT"}
      </button>
    </form>
  );
};
