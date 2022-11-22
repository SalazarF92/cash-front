export default function Button({ text, type }: { text: string, type: any }) {
  return (
    <button
      className="w-32 h-8 bg-blue-800 hover:bg-[#112873] rounded-r-2xl"
      type={type}
    >
      {text}
    </button>
  );
}
