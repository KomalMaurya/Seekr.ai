export async function POST(req){
    const [userInput,searchType]=await req.json();

    return NextResponse.json();
}