interface CardProps{
  id: number;
  order: number;
  title: string;
  writer: string;
  text: string;
  onDelete: (id: number) => void;
}


export default function Card({ id, order, title, writer, text, onDelete }: CardProps){

  return(
    <div className="card-container">
      <div className="order">{order}번 할 일</div>
      <div className="title">{title}</div>
      <div className="writer">{writer}</div>
      <div className="text">{text}</div>
      <button className="complete" onClick={() => onDelete(id)}>완료</button>
    </div>
  )
}