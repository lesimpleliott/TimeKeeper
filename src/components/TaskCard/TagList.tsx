type TagListProps = {
  tags: string[];
};

const TagList = ({ tags }: TagListProps) => {
  return (
    <section className="flex items-center gap-1">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="rounded-full bg-gray-300 px-2 py-px text-xs text-black"
        >
          {tag}
        </span>
      ))}
    </section>
  );
};

export default TagList;
