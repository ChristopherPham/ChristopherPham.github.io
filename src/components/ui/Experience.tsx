function Experience() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-16" id="experience">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Career history
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Experience</h2>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          A selection of work across application development, cloud automation, systems integration, and AI workflows.
        </p>
      </div>

      <div className="relative space-y-10 before:absolute before:bottom-0 before:left-[7px] before:top-2 before:w-px before:bg-zinc-800">
        <article className="relative pl-8">
          <span className="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-zinc-950 bg-cyan-400" />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Application Developer / Full-Stack Engineer</h3>
              <p className="mt-1 text-cyan-400">Falkon Technologies</p>
            </div>
            <p className="text-sm font-medium text-zinc-500">Nov 2017 - Present</p>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-300">
            <li>Designed and optimized high-throughput RESTful APIs and distributed microservices using C#, .NET, Dapper, and SQL Server.</li>
            <li>Developed responsive, accessible interfaces with JavaScript, TypeScript, React, and HTML/CSS.</li>
            <li>Integrated AWS services including S3, Lambda, and API Gateway into scalable applications and CI/CD pipelines.</li>
            <li>Implemented AI-driven enhancements and LLM integrations for internal workflows and customer-facing tools.</li>
            <li>Tuned SQL queries, database indexes, and data access layers to improve enterprise application performance.</li>
          </ul>
        </article>

        <article className="relative pl-8">
          <span className="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-zinc-950 bg-cyan-400" />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Salesforce Administrator / Systems Integrator</h3>
              <p className="mt-1 text-cyan-400">Firedoor <span className="text-zinc-500">(Contract)</span></p>
            </div>
            <p className="text-sm font-medium text-zinc-500">Apr 2022 - Sep 2022</p>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-300">
            <li>Partnered with C-level stakeholders to design and deploy Salesforce Flows that reduced manual operational work.</li>
            <li>Structured, maintained, and cleaned core CRM objects to improve data accuracy across client pipelines.</li>
            <li>Delivered user training, operational documentation, and tier-3 technical troubleshooting.</li>
          </ul>
        </article>

        <article className="relative pl-8">
          <span className="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-zinc-950 bg-cyan-400" />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Software Developer</h3>
              <p className="mt-1 text-cyan-400">Gift Chimp LLC <span className="text-zinc-500">(Startup)</span></p>
            </div>
            <p className="text-sm font-medium text-zinc-500">May 2016 - Jul 2016</p>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-300">
            <li>Built backend workflows and form-handling logic with the C# .NET MVC Framework and front-end web components.</li>
            <li>Designed relational MySQL schemas and wrote queries to support rapid feature prototyping.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Experience;
