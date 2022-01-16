import Link from "next/link";

const About = () => {
  return (
    <div id="about" className="py-10 mt-16 mb-60">      
      <div className="container relative max-w-6xl py-3 pt-16 mx-auto mt-20 sm:max-w-xl sm:mx-auto">      
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="font-mono text-3xl font-bold text-th-primary-dark">
                Tales of Feather
              </h1>
            </div>
            <div className="divide-y divide-gray-200">              
              <div className="pt-6 text-base leading-6 font-extralight text-th-primary-medium sm:text-lg sm:leading-7">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </p>
                <p className="mt-8">
                  <Link href="#main">
                    <a className="hover:text-th-accent-dark text-th-accent-light rounded">
                      Mint one
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
