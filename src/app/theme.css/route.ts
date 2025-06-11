import { NextResponse } from "next/server";

const MAX_AGE = 60 * 30;

export async function GET() {

  const mock_css = `
  :root{
    --accent:#769C40;
    --accent-2:#2C2C2C;
    --section-bg:#FFFFFF;
    --primary-text:#000000;
    --section-border:#E5E5E5;
    --main-bg:#F8F8F8;
    --secondary-text:#636363;
  }`.trim();

  return new NextResponse(mock_css, {
    headers: {
      "Content-Type": "text/css; charset=utf-8",
      "Cache-Control": `public, max-age=${MAX_AGE}`,
    },
  });
}