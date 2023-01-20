function ContactLink({
  contact,
  link,
}:{
  contact: string | null,
  link: string,
}) {
  return (
    (!contact
      ? (<div>Not specified</div>)
      : (<a href={link} target="_blank" rel="noreferrer">{contact}</a>)
    )
  );
}

export default ContactLink;
