type CardProps = {
  title: string;
};

const Card = ({ title }: CardProps) => {
  return (
    <div>
      <div>{title}</div>

      <hr></hr>

      <></>
    </div>
  );
};

export default Card;
