export default function Button({ text, type, disable }: { text: string, type: any, disable?: false }) {
  return (
    <button
      disabled={disable}
      className="w-32 h-8 bg-blue-800 hover:bg-[#112873] rounded-r-2xl disabled:opacity-25"
      type={type}
    >
      {text}
    </button>
  );
}
