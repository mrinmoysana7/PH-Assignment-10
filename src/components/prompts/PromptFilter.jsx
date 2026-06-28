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
import FilterSelect from "./FilterSelect";

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
        shadow-xl
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

        <div className="grid grid-cols-1 gap-4 rounded-3xl bg-default-50/70 p-5 backdrop-blur-xl md:grid-cols-2 xl:grid-cols-4">
          {/* Category */}

          {/* <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-default-500">
              Category
            </p>

            <Select selectedKey={category} onSelectionChange={setCategory}>
              <Select.Trigger
                className="
        w-full
        h-12
        rounded-xl
        bg-white
        px-3
        shadow-sm
        transition-all
        duration-300
        hover:border-sky-300
        hover:shadow-md
        focus-within:border-sky-500
        focus-within:ring-2
        focus-within:ring-sky-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                    <LayoutList width={18} className="text-violet-600" />
                  </div>

                  <Select.Value placeholder="All Categories" />
                </div>
              </Select.Trigger>

              <Select.Popover>
                <ListBox className="bg-white/90 py-4 space-y-3 rounded-md">
                  {categories.map((item) => (
                    <ListBox.Item
                      key={item}
                      id={item}
                      className="hover:cursor-pointer hover:bg-purple-400"
                    >
                      <div className="px-10 py-1.5">
                        {item === "all" ? "All Categories" : item}
                      </div>
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div> */}

          <FilterSelect
            label="Category"
            icon={<LayoutList width={18} />}
            value={category}
            onChange={setCategory}
            options={categories}
            placeholder="All Categories"
            color="violet"
          />

          {/* AI Tool */}

          {/* <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-default-500">
              AI Tool
            </p>

            <Select
              className="w-full"
              selectedKey={tool}
              onSelectionChange={setTool}
            >
              <Select.Trigger
                className="
                w-full
        h-12
        rounded-xl
        bg-white
        px-3
        shadow-sm
        transition-all
        duration-300
        hover:border-sky-300
        hover:shadow-md
        focus-within:border-sky-500
        focus-within:ring-2
        focus-within:ring-sky-500/20
      "
              >
                <div className="flex flex-1 items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100">
                    <Sparkles width={18} height={18} className="text-sky-600" />
                  </div>

                  <Select.Value placeholder="All AI Tools" />
                </div>

              </Select.Trigger>

              <Select.Popover className="rounded-xl border border-default-200 shadow-xl">
                <ListBox>
                  {tools.map((item) => (
                    <ListBox.Item key={item} id={item} className="rounded-lg">
                      {item === "all" ? "All AI Tools" : item}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div> */}

          <FilterSelect
            label="AI Tool"
            icon={<Sparkles width={18} />}
            value={tool}
            onChange={setTool}
            options={tools}
            placeholder="All AI Tools"
            color="sky"
          />

          {/* Difficulty */}

          {/* <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-default-500">
              Difficulty
            </p>

            <Select
              className="w-full"
              selectedKey={difficulty}
              onSelectionChange={setDifficulty}
            >
              <Select.Trigger
                className="
                w-full
        h-12
        rounded-xl
        bg-white
        px-3
        shadow-sm
        transition-all
        duration-300
        hover:border-orange-300
        hover:shadow-md
        focus-within:border-orange-500
        focus-within:ring-2
        focus-within:ring-orange-500/20
      "
              >
                <div className="flex flex-1 items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                    <Sparkles
                      width={18}
                      height={18}
                      className="text-orange-500"
                    />
                  </div>

                  <Select.Value placeholder="All Levels" />
                </div>
              </Select.Trigger>

              <Select.Popover className="rounded-xl border border-default-200 shadow-xl">
                <ListBox>
                  {difficulties.map((item) => (
                    <ListBox.Item key={item} id={item} className="rounded-lg">
                      {item === "all" ? "All Levels" : item}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div> */}

          <FilterSelect
            label="Difficulty"
            icon={<Sparkles width={18} />}
            value={difficulty}
            onChange={setDifficulty}
            options={difficulties}
            placeholder="All Levels"
            color="orange"
          />

          {/* Sort By */}

          {/* <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-default-500">
              Sort By
            </p>

            <Select
              className="w-full"
              selectedKey={sort}
              onSelectionChange={setSort}
            >
              <Select.Trigger
                className="
        h-12
        w-full
        rounded-xl
        bg-white
        px-3
        shadow-sm
        transition-all
        duration-300
        hover:border-emerald-300
        hover:shadow-md
        focus-within:border-emerald-500
        focus-within:ring-2
        focus-within:ring-emerald-500/20
      "
              >
                <div className="flex flex-1 items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
                    <LayoutList
                      width={18}
                      height={18}
                      className="text-emerald-600"
                    />
                  </div>

                  <Select.Value placeholder="Newest" />
                </div>
              </Select.Trigger>

              <Select.Popover className="rounded-xl border border-default-200 bg-white shadow-xl">
                <ListBox>
                  <ListBox.Item
                    id="newest"
                    className="rounded-lg transition-colors hover:bg-emerald-50"
                  >
                    🆕 Newest
                  </ListBox.Item>

                  <ListBox.Item
                    id="rating"
                    className="rounded-lg transition-colors hover:bg-emerald-50"
                  >
                    ⭐ Highest Rating
                  </ListBox.Item>

                  <ListBox.Item
                    id="copies"
                    className="rounded-lg transition-colors hover:bg-emerald-50"
                  >
                    📋 Most Copied
                  </ListBox.Item>

                  <ListBox.Item
                    id="reviews"
                    className="rounded-lg transition-colors hover:bg-emerald-50"
                  >
                    💬 Most Reviewed
                  </ListBox.Item>

                  <ListBox.Item
                    id="title"
                    className="rounded-lg transition-colors hover:bg-emerald-50"
                  >
                    🔤 A - Z
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div> */}

          <FilterSelect
            label="Sort By"
            icon={<LayoutList width={18} />}
            value={sort}
            onChange={setSort}
            options={["newest", "rating", "copies", "reviews", "title"]}
            placeholder="Newest"
            color="emerald"
          />
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
