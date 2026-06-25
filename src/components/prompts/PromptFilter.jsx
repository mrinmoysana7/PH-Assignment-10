// "use client";

// import {
//   Button,
//   InputGroup,
//   Label,
//   ListBox,
//   Select,
//   TextField,
// } from "@heroui/react";

// import { Magnifier } from "@gravity-ui/icons";

// export default function PromptFilter({
//   search,
//   setSearch,
//   category,
//   setCategory,
//   tool,
//   setTool,
//   difficulty,
//   setDifficulty,
//   prompts,
// }) {
//   const categories = ["all", ...new Set(prompts.map((item) => item.category))];

//   const tools = ["all", ...new Set(prompts.map((item) => item.aiToolName))];

//   const difficulties = [
//     "all",
//     ...new Set(prompts.map((item) => item.difficultyLevel)),
//   ];

//   return (
//     <div className="rounded-2xl border border-default-200 bg-content1 p-6">
//       <div className="grid gap-4 lg:grid-cols-5">
//         {/* Search */}

//         <TextField className="lg:col-span-2">
//           <Label>Search Prompt</Label>

//           <InputGroup>
//             <InputGroup.Prefix>
//               <Magnifier width={18} />
//             </InputGroup.Prefix>

//             <InputGroup.Input
//               placeholder="Search title, description or tags..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </InputGroup>
//         </TextField>

//         {/* Category */}

//         <Select selectedKey={category} onSelectionChange={setCategory}>
//           <Label>Category</Label>

//           <Select.Trigger>
//             <Select.Value />
//             <Select.Indicator />
//           </Select.Trigger>

//           <Select.Popover>
//             <ListBox>
//               {categories.map((item) => (
//                 <ListBox.Item key={item} id={item}>
//                   {item === "all" ? "All Categories" : item}
//                 </ListBox.Item>
//               ))}
//             </ListBox>
//           </Select.Popover>
//         </Select>

//         {/* AI Tool */}

//         <Select selectedKey={tool} onSelectionChange={setTool}>
//           <Label>AI Tool</Label>

//           <Select.Trigger>
//             <Select.Value />
//             <Select.Indicator />
//           </Select.Trigger>

//           <Select.Popover>
//             <ListBox>
//               {tools.map((item) => (
//                 <ListBox.Item key={item} id={item}>
//                   {item === "all" ? "All Tools" : item}
//                 </ListBox.Item>
//               ))}
//             </ListBox>
//           </Select.Popover>
//         </Select>

//         {/* Difficulty */}

//         <Select selectedKey={difficulty} onSelectionChange={setDifficulty}>
//           <Label>Difficulty</Label>

//           <Select.Trigger>
//             <Select.Value />
//             <Select.Indicator />
//           </Select.Trigger>

//           <Select.Popover>
//             <ListBox>
//               {difficulties.map((item) => (
//                 <ListBox.Item key={item} id={item}>
//                   {item === "all" ? "All Levels" : item}
//                 </ListBox.Item>
//               ))}
//             </ListBox>
//           </Select.Popover>
//         </Select>
//       </div>

//       <div className="mt-6 flex justify-end">
//         <Button
//           color="secondary"
//           variant="flat"
//           onPress={() => {
//             setSearch("");
//             setCategory("all");
//             setTool("all");
//             setDifficulty("all");
//           }}
//         >
//           Reset Filters
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Button,
  InputGroup,
  Label,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";

import { Magnifier, Sparkles, LayoutList } from "@gravity-ui/icons";

export default function PromptFilter({
  search,
  setSearch,
  category,
  setCategory,
  tool,
  setTool,
  difficulty,
  setDifficulty,
  sort,
  setSort,
  prompts,
}) {
  const categories = ["all", ...new Set(prompts.map((item) => item.category))];

  const tools = ["all", ...new Set(prompts.map((item) => item.aiToolName))];

  const difficulties = [
    "all",
    ...new Set(prompts.map((item) => item.difficultyLevel)),
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-white/80
        p-6
        shadow-2xl
        backdrop-blur-xl
      "
    >
      {/* Background Glow */}

      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-violet-400/10 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative z-10">
        {/* Heading */}

        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Explore AI Prompts
            </h2>

            <p className="mt-1 text-default-500">
              Discover thousands of premium AI prompts.
            </p>
          </div>

          <div className="hidden rounded-full bg-violet-100 px-4 py-2 md:flex md:items-center md:gap-2">
            <Sparkles width={18} height={18} className="text-violet-600" />

            <span className="text-sm font-semibold text-violet-700">
              AI Marketplace
            </span>
          </div>
        </div>

        {/* Search */}

        <div className="mb-6">
          <TextField className="flex-1">
            <Label>Search Prompt</Label>

            <InputGroup className="rounded-2xl flex items-center gap-2 bg-content1 shadow-lg">
              <InputGroup.Prefix className="pl-4">
                <Magnifier
                  width={20}
                  height={20}
                  className="text-default-500"
                />
              </InputGroup.Prefix>

              <InputGroup.Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, description or tags..."
                className="h-14 text-[15px] w-full"
              />
            </InputGroup>
          </TextField>

          {/* <Button
            color="secondary"
            size="lg"
            radius="full"
            className="
              h-14
              px-8
              bg-linear-to-r
              from-violet-600
              to-fuchsia-600
              font-semibold
              shadow-lg
              shadow-violet-500/20
              hover:scale-[1.02]
            "
            startContent={<Magnifier width={18} />}
          >
            Search
          </Button> */}
        </div>

        {/* Filter Row */}

        <div className="grid grid-cols-1 gap-4 rounded-3xl border border-default-200 bg-default-50/70 p-5 backdrop-blur-xl md:grid-cols-2 xl:grid-cols-4">
          {/* Category */}

          {/* <Select selectedKey={category} onSelectionChange={setCategory}>
            <Label>Category</Label>

            <Select.Trigger className="h-14 rounded-2xl border border-default-200 bg-content1">
              <LayoutList width={18} className="mr-2 text-violet-600" />

              <Select.Value />

              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {categories.map((item) => (
                  <ListBox.Item key={item} id={item}>
                    {item === "all" ? "All Categories" : item}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select> */}

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-default-500">
              Category
            </p>

            <Select selectedKey={category} onSelectionChange={setCategory}>
              <Select.Trigger className="h-12 p-3 rounded-xl border-0 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                    <LayoutList width={18} className="text-violet-600" />
                  </div>

                  <Select.Value placeholder="All Categories" />
                </div>

                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {categories.map((item) => (
                    <ListBox.Item key={item} id={item}>
                      {item === "all" ? "All Categories" : item}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* AI Tool */}

          <Select selectedKey={tool} onSelectionChange={setTool}>
            <Label>AI Tool</Label>

            <Select.Trigger className="h-14 rounded-2xl border border-default-200 bg-content1">
              <Sparkles width={18} className="mr-2 text-violet-600" />

              <Select.Value />

              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {tools.map((item) => (
                  <ListBox.Item key={item} id={item}>
                    {item === "all" ? "All AI Tools" : item}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {/* Difficulty */}

          <Select selectedKey={difficulty} onSelectionChange={setDifficulty}>
            <Label>Difficulty</Label>

            <Select.Trigger className="h-14 rounded-2xl border border-default-200 bg-content1">
              <Sparkles width={18} className="mr-2 text-orange-500" />

              <Select.Value />

              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {difficulties.map((item) => (
                  <ListBox.Item key={item} id={item}>
                    {item === "all" ? "All Levels" : item}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Sort */}

          <Select selectedKey={sort} onSelectionChange={setSort}>
            <Label>Sort By</Label>

            <Select.Trigger className="h-14 rounded-2xl border border-default-200 bg-content1">
              <LayoutList width={18} className="mr-2 text-sky-600" />

              <Select.Value />

              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item id="newest">Newest</ListBox.Item>

                <ListBox.Item id="rating">Highest Rating</ListBox.Item>

                <ListBox.Item id="copies">Most Copied</ListBox.Item>

                <ListBox.Item id="reviews">Most Reviewed</ListBox.Item>

                <ListBox.Item id="title">A - Z</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Active Filters */}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-default-500">
            Active Filters
          </span>

          {category !== "all" && (
            <Button
              size="sm"
              radius="full"
              variant="flat"
              color="secondary"
              onPress={() => setCategory("all")}
            >
              {category} ✕
            </Button>
          )}

          {tool !== "all" && (
            <Button
              size="sm"
              radius="full"
              variant="flat"
              color="secondary"
              onPress={() => setTool("all")}
            >
              {tool} ✕
            </Button>
          )}

          {difficulty !== "all" && (
            <Button
              size="sm"
              radius="full"
              variant="flat"
              color="warning"
              onPress={() => setDifficulty("all")}
            >
              {difficulty} ✕
            </Button>
          )}

          {search && (
            <Button
              size="sm"
              radius="full"
              variant="flat"
              color="primary"
              onPress={() => setSearch("")}
            >
              {/* "{search}" ✕ */}
            </Button>
          )}
        </div>

        {/* Bottom Section */}

        <div className="mt-8 flex flex-col gap-4 border-t border-default-200 pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold">Find the perfect AI Prompt</h3>

            <p className="text-sm text-default-500">
              Filter by category, AI model, difficulty and popularity.
            </p>
          </div>

          <Button
            radius="full"
            variant="bordered"
            className="border-violet-200 hover:bg-violet-50"
            onPress={() => {
              setSearch("");
              setCategory("all");
              setTool("all");
              setDifficulty("all");
              setSort("newest");
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </section>
  );
}
