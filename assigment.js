// Function to decode y value from different bases
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Lagrange interpolation function
function lagrangeInterpolation(points) {
    const numPoints = points.length; // Number of points
    if (numPoints === 0) return null; // Handle empty input
    if (numPoints === 1) return points[0].y; // If only one point, return its y-value

    let constantTerm = 0; // To store the constant term (f(0))

    // Loop over each point (xi, yi)
    for (let i = 0; i < numPoints; i++) {
        const xi = points[i].x;
        const yi = points[i].y;

        // Lagrange basis polynomial
        let basisPolynomial = 1;
        
        for (let j = 0; j < numPoints; j++) {
            if (i !== j) {
                const xj = points[j].x;
                basisPolynomial *= (0 - xj) / (xi - xj); // Calculate Lagrange basis polynomial at x = 0
            }
        }

        // Add the contribution of this term to the constant term
        constantTerm += yi * basisPolynomial;
    }

    return constantTerm; // Return the result directly
}


// Function to parse the input JSON and solve for the constant term
function solveSecret(jsonInput) {
    let keys = jsonInput.keys;
    let n = keys.n;
    let k = keys.k;

    // Collect the first 'k' points
    let points = [];
    let count = 0;

    for (let key in jsonInput) {
        if (key !== "keys" && count < k) {
            let x = parseInt(key, 10);  // Use the key as the x value
            let base = parseInt(jsonInput[key].base, 10);  // Get the base
            let value = jsonInput[key].value;  // Get the encoded value
            let y = decodeValue(base, value);  // Decode the y value
            points.push({ x: x, y: y });  // Add the point (x, y)
            count++;
        }
    }

    // Perform Lagrange interpolation to find the constant term 'c'
    let constantTerm = lagrangeInterpolation(points);

    return constantTerm;
}

// Example Test Case 1
let testCase1 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};

// Example Test Case 2
let testCase2 = {
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
};

let testCase3 = {
    "keys": {
        "n": 3,
        "k": 2
    },
    "1": {
        "base": "10",
        "value": "5"
    },
    "2": {
        "base": "10",
        "value": "11"
    },
    "3": {
        "base": "10",
        "value": "17"
    }
}

let testCase4 = {
    "keys": {
        "n": 3,
        "k": 2
    },
    "5": {
        "base": "2",
        "value": "1011"
    },
    "6": {
        "base": "8",
        "value": "16"
    },
    "7": {
        "base": "10",
        "value": "35"
    }
}

let testCase5 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "16",
        "value": "A"
    },
    "2": {
        "base": "10",
        "value": "1"
    },
    "3": {
        "base": "8",
        "value": "7"
    },
    "4": {
        "base": "10",
        "value": "12"
    }
}


// Run the tests
console.log("Test Case 1: Constant term c =", solveSecret(testCase1));
console.log("Test Case 2: Constant term c =", solveSecret(testCase2));
console.log("Test Case 3: Constant term c =", solveSecret(testCase3));
console.log("Test Case 4: Constant term c =", solveSecret(testCase4));
console.log("Test Case 5: Constant term c =", solveSecret(testCase5));

