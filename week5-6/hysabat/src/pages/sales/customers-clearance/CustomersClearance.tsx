import ReactQuill from "react-quill-new";

const Hello = () => {

  return (
    <div>
      <h1>Text Editor test</h1>
      <ReactQuill
        placeholder="Write something..."
        className="bg-white"
      />
    </div>
  )
}

export default Hello