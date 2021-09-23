const parse = require("./exitAddressesParser");

test("parses addresses", () => {
  const torData = `ExitNode 4273E6D162ED2717A1CF4207A254004CD3F5307B
Published 2021-06-10 17:07:21
LastStatus 2021-06-11 06:00:00
ExitAddress 176.10.99.200 2021-06-11 06:30:54
ExitNode 0D12D8E72DED99EE31BB0C57789352BED0CEEEFF
Published 2021-06-10 09:57:02
LastStatus 2021-06-11 06:00:00
ExitAddress 109.70.100.40 2021-06-11 06:46:16
ExitNode D947623B30C9D6E142E7D90FC7368B1A2A4F5045
Published 2021-06-10 12:43:25
LastStatus 2021-06-11 06:00:00
ExitAddress 51.75.64.23 2021-06-11 06:51:05
ExitAddress 23.129.64.207 2021-05-25 19:49:52
ExitNode D5228FA5AA9FDB3825E6F199AFA9F9E6F9526A17
Published 2021-06-10 11:28:13
LastStatus 2021-06-11 06:00:00
ExitAddress 82.221.128.191 2021-06-11 06:20:42
`;

  expect(parse(torData)).toEqual([
    {
      exitAddress: "176.10.99.200",
      exitNode: "4273E6D162ED2717A1CF4207A254004CD3F5307B",
      lastStatus: "2021-06-11 06:00:00",
      published: "2021-06-10 17:07:21",
    },
    {
      exitAddress: "109.70.100.40",
      exitNode: "0D12D8E72DED99EE31BB0C57789352BED0CEEEFF",
      lastStatus: "2021-06-11 06:00:00",
      published: "2021-06-10 09:57:02",
    },
    {
      exitAddress: "51.75.64.23",
      exitNode: "D947623B30C9D6E142E7D90FC7368B1A2A4F5045",
      lastStatus: "2021-06-11 06:00:00",
      published: "2021-06-10 12:43:25",
    },
    {
      exitAddress: "23.129.64.207",
    },
    {
      exitAddress: "82.221.128.191",
      exitNode: "D5228FA5AA9FDB3825E6F199AFA9F9E6F9526A17",
      lastStatus: "2021-06-11 06:00:00",
      published: "2021-06-10 11:28:13",
    },
  ]);
});
