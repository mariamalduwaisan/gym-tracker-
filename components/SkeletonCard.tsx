export default function SkeletonCard() {
  return (
    <div className="skel" aria-hidden="true">
      <div className="skel-circle" />
      <div className="skel-line lg w75" />
      <div className="skel-line w55" />
      <br />
      <div className="skel-line" />
      <div className="skel-line" />
      <div className="skel-line w75" />
      <br />
      <div className="skel-line w40" />
      <div className="skel-line" />
    </div>
  )
}
