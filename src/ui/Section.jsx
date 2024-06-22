/* eslint-disable react/prop-types */
function Section({ children, isLoading, sectionRef }) {
  return (
    <div
      ref={sectionRef}
      className={`${isLoading ? 'h-96' : ''} relative flex flex-col pb-36`}
    >
      {children}
    </div>
  );
}

export default Section;
