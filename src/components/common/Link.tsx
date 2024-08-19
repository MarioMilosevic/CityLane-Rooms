const Link = ({index, link}) => {
  return (
    <li key={index} className="flex items-center space-x-2">
      <span>{<link.icon />}</span>
      <h2>{link.heading}</h2>
    </li>
  );
}

export default Link
