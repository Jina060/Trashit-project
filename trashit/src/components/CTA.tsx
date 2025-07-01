
export default function CTA() {
  return (
    <section className="bg-green-100 rounded-3xl py-10 px-6 md:px-16 mb-16 mx-4 md:mx-20 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
      <h2 className="text-2xl md:text-3xl font-bold text-trashBlue mb-6 md:mb-0">
        Ready to make waste pickup seamless with TrashIt?
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        <button className="bg-trashBlue hover:bg-green-800 text-trashGreen font-normal text-lg py-3 px-6 rounded-full transition">
          Get Started
        </button>
      </div>
    </section>
  );
}
