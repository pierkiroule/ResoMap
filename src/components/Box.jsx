const Box = ({ title, children, footer }) => {
  return (
    <section className="box">
      {title && <h1>{title}</h1>}
      <div>{children}</div>
      {footer && <div className="box-actions">{footer}</div>}
    </section>
  );
};

export default Box;
