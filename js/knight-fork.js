RelativeCoordinates = Chessboard.RelativeCoordinates

const config = {
    draggable: false,
    moveSpeed: 0,
    position: {},
    onContextmenuSquare: onContextmenuSquare,
    onMouseclickSquare: onMouseclickSquare
}
const files = "abcdefgh";
// Pawns are the least likely. Kings are the most likely (more or less).
const target_pieces = ["P", "R", "R", "N", "N", "B", "B", "Q", "Q", "K", "K", "K", "K", "K"];
const target_pieces_no_king = ["R", "N", "B", "Q"];
const target_color = ["w", "b"];

var clicked_squares = [];
var clicked_square_elements = [];
var correct_squares = [];

const board = ChessBoard('board', config);

const error_screen = document.createElement("div");
error_screen.id = "error-screen";
error_screen.style.display = "none";
error_screen.style.width = board.board().getBoundingClientRect().width;
error_screen.style.height = board.board().getBoundingClientRect().height;
error_screen.style.top = board.board().getBoundingClientRect().top;
error_screen.style.left = board.board().getBoundingClientRect().left;
board.container().appendChild(error_screen);

function toggleSelection(element, color) {
    if (element.style.boxShadow === "") {
        let width = element.getBoundingClientRect().width;

        let blur = Math.floor(parseInt(width, 10) / 5);
        let spread = Math.floor(blur/ 2);

        element.style.boxShadow = `0 0 ${blur}px ${spread}px `+ color + " inset";
    } else {
        deselect(element);
    }
}

function deselect(element) {
    console.log("deselecting: " + element);
    element.style.opacity = 1.0;
    element.style.boxShadow = "";
}

function onMouseclickSquare (evt, square) {
    let square_name = square.getAttribute("data-square")
    const index = clicked_squares.indexOf(square_name);

    if (index >= 0) {
        clicked_squares.splice(index, 1);
        clicked_square_elements.splice(index, 1);
    }
    else {
        clicked_squares.push(square_name);
        clicked_square_elements.push(square);
    }

    console.log(clicked_squares);
    console.log(clicked_square_elements);

    toggleSelection(square, "#e6c912");
}

function onContextmenuSquare (evt, square) {
    toggleSelection(square, "#FF0000")
}

async function verify() {
    if (clicked_squares.toSorted().join(",") == correct_squares.sort().join(",")) {
        clearSelectedSquares();
        display_new_puzzle();
    } else {
        toggleError();
        await new Promise(r => setTimeout(r, 100));
        toggleError();
        await new Promise(r => setTimeout(r, 100));
        toggleError();
        await new Promise(r => setTimeout(r, 100));
        toggleError();
    }
}

function toggleError() {
    if (error_screen.style.display == "none") {
        error_screen.style.display = "inline-block";
    } else {
        error_screen.style.display = "none";
    }
    toggleSelection(error_screen, "#FF0000")
}

function clearSelectedSquares() {
    clicked_square_elements.forEach((square) => {
        deselect(square);
    });

    clicked_square_elements =[];
    clicked_squares = [];

}

function square_add(square, relative) {
    return String.fromCharCode(square.charCodeAt(0) + relative.x) + (parseInt(square[1], 10) + relative.y);
 }

function get_square_name(file, rank) {
    return file + rank;
}

function get_enemy_coordinates() {
    var rank1 = Math.ceil(Math.random() * 8);
    var file_index_1 = Math.floor(Math.random() * 8)
    var file1 = files[file_index_1];

    var rank2 = rank1;
    var file2 = file1;

    while (rank2 == rank1 && file2 == file1) {
        rank2 = Math.ceil(Math.random() * 8);
        file_index_2 = Math.floor(Math.random() * 8)
        file2 = files[file_index_2];
    }

    return [file1, file_index_1, rank1, file2, rank2];
}

function display_new_puzzle() {
    // This is a hack to clear the board and ensure that the pieces don't "slide" between puzzles.
    board.position({});

    correct_squares = [];
    const [file1, file_index_1, rank1, file2, rank2] = get_enemy_coordinates();
    const square_1_name = get_square_name(file1, rank1);
    const square_2_name = get_square_name(file2, rank2);
    const square_1 = $('*[data-square="' + square_1_name + '"]')[0]
    const square_2 = $('*[data-square="' + square_2_name + '"]')[0]

    const color = target_color[Math.floor(Math.random() * target_color.length)]
    const piece_1 = target_pieces[Math.floor(Math.random() * target_pieces.length)]
    const piece_2 = target_pieces_no_king[Math.floor(Math.random() * target_pieces_no_king.length)]

    var position = {
        [square_1_name]:  color + piece_1,
        [square_2_name]: color + piece_2
    }

    board.position(position);

    enemy_relationship = new RelativeCoordinates(file_index_2 - file_index_1, rank2 - rank1);

    const fork_positions = Chessboard.KnightForkMap.get(enemy_relationship.toString()) || [];

    fork_positions.forEach((potential_position) => {
        potential_square = square_add(square_1_name, potential_position);
        if (ChessBoard.validSquare(potential_square)) {
            //toggleRed($('*[data-square="' + potential_square + '"]')[0]);
            correct_squares.push(potential_square);
        }
    });
}

$(document).on("keypress", async function(evt) {
    if (evt.which === 13 || evt.which === 99) {
        await verify();
    }
});

$(document).ready(display_new_puzzle)
