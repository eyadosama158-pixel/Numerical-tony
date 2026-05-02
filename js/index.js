var bigContainer = document.getElementById("big-container");
var container = document.getElementById("container");
var cardBody = document.getElementById("card-body");

var fx = document.getElementById("fx");
var fxLabel = document.getElementById("fx-label");

var dfx = document.getElementById("dfx");
var dfxLabel = document.getElementById("dfx-label");

var gx = document.getElementById("gx");
var gxLabel = document.getElementById("gx-label");

var xl = document.getElementById("xl");
var xlLabel = document.getElementById("xl-label");

var xu = document.getElementById("xu");
var xuLabel = document.getElementById("xu-label");

var x0 = document.getElementById("x0");
var x0Label = document.getElementById("x0-label");

var x1 = document.getElementById("x1");
var x1Label = document.getElementById("x1-label");

var tol = document.getElementById("tol");
var tolLabel = document.getElementById("tol-label");

var iter = document.getElementById("iter");
var iterLabel = document.getElementById("iter-label");

var methodSelect = document.getElementById("method-select");
var selectedOptions = methodSelect.selectedOptions;
var calculateBtn = document.getElementById("calculate-btn");
var inputsRow = document.getElementById("inputs-row");

var resultBox = document.getElementById("result-box");

var tableHead = document.getElementById("table-head-row");
var tableBody = document.getElementById("table-body");
function refreshInputs() {
  fx = document.getElementById("fx");
  fxLabel = document.getElementById("fx-label");

  dfx = document.getElementById("dfx");
  dfxLabel = document.getElementById("dfx-label");

  gx = document.getElementById("gx");
  gxLabel = document.getElementById("gx-label");

  xl = document.getElementById("xl");
  xlLabel = document.getElementById("xl-label");

  xu = document.getElementById("xu");
  xuLabel = document.getElementById("xu-label");

  x0 = document.getElementById("x0");
  x0Label = document.getElementById("x0-label");

  x1 = document.getElementById("x1");
  x1Label = document.getElementById("x1-label");

  tol = document.getElementById("tol");
  tolLabel = document.getElementById("tol-label");

  iter = document.getElementById("iter");
  iterLabel = document.getElementById("iter-label");
}
function changeToLinearEquation() {
  methodSelect.innerHTML = `<option value="1">Gauss Elimination</option>
                                    <option value="2">LU Decomposition</option>
                                    <option value="3">Cramer Rule</option>
                                    <option value="4">Gauss Jordan</option>`;
  inputsRow.innerHTML = `  
                    <div class="tab-pane fade show active">
                        <form class="needs-validation" novalidate>
                                <div class="invalid-feedback">Please select a method.</div>
                            </div>
                            <h6 class="mb-3 border-bottom pb-2">3x3 Matrix System (Ax = B)</h6> <!-- Row 1 -->
                            <div class="row g-2 mb-3">
                                <div class="col-6 col-md-3"><input type="number" class="form-control" placeholder="a11" required>
                                </div>
                                <div class="col-6 col-md-3"><input type="number" class="form-control" placeholder="a12" required>
                                </div>
                                <div class="col-6 col-md-3"><input type="number" class="form-control" placeholder="a13" required>
                                </div>
                                <div class="col-6 col-md-3"><input type="number" class="form-control border-danger"
                                        placeholder="b1" required></div>

                            </div> <!-- Row 2 -->
                            <div class="row g-2 mb-3">
                                <div class="col-6 col-md-3"><input type="number" class="form-control" placeholder="a21" required>
                                </div>
                                <div class="col-6 col-md-3"><input type="number" class="form-control" placeholder="a22" required>
                                </div>
                                <div class="col-6 col-md-3"><input type="number" class="form-control" placeholder="a23" required>
                                </div>
                                <div class="col-6 col-md-3"><input type="number" class="form-control border-danger"
                                        placeholder="b2" required></div>

                            </div> <!-- Row 3 -->
                            <div class="row g-2 mb-4">
                                <div class="col-6 col-md-3"><input type="number" class="form-control" placeholder="a31" required>
                                </div>
                                <div class="col-6 col-md-3"><input type="number" class="form-control" placeholder="a32" required>
                                </div>
                                <div class="col-6 col-md-3"><input type="number" class="form-control" placeholder="a33" required>
                                </div>
                                <div class="col-6 col-md-3"><input type="number" class="form-control border-danger"
                                        placeholder="b3" required></div>

                            </div>

                            <div class="col-md-12 d-flex justify-content-center">
                                <button type="button" class="btn btn-success" onclick="solveLinear()">Calculate</button>
                            </div>

                        </form>
                    </div>`;
  refreshInputs();
  methodCases();
}

function changeToRootEquation() {
  methodSelect.innerHTML = `
                                <option value="1" id="option-1">Biesection Method </option>
                                <option value="2" id="option-2">False Position Method </option>
                                <option value="3" id="option-3">Fixed Point Method</option>
                                <option value="4" id="option-4">Newton Method</option>
                                <option value="5" id="option-5">Secant Method</option>`;
  inputsRow.innerHTML = `  <div class="col-md-12" id="fx-container">
                            <label class="form-label" id="fx-label">Function f(x)</label>
                            <input type="text" class="form-control" id="fx" required>
                        </div>

                        <div class="col-md-12" id="dfx-container">
                            <label class="form-label" id="dfx-label">Derivative f'(x)</label>
                            <input type="text" class="form-control" id="dfx">
                        </div>

                        <div class="col-md-12" id="gx-container">
                            <label class="form-label" id="gx-label">Function g(x)</label>
                            <input type="text" class="form-control" id="gx">
                        </div>

                        <div class="col-md-6" id="xl-container">
                            <label class="form-label" id="xl-label">Lower Bound xl</label>
                            <input type="number" step="any" class="form-control" id="xl">
                        </div>

                        <div class="col-md-6" id="xu-container">
                            <label class="form-label" id="xu-label">Upper Bound xu</label>
                            <input type="number" step="any" class="form-control" id="xu">
                        </div>

                        <div class="col-md-6" id="x0-container">
                            <label class="form-label" id="x0-label">Initial Guess x0</label>
                            <input type="number" step="any" class="form-control" id="x0">
                        </div>

                        <div class="col-md-6" id="x1-container">
                            <label class="form-label" id="x1-label">Initial Guess x1</label>
                            <input type="number" step="any" class="form-control" id="x1">
                        </div>

                        <div class="col-md-6" id="tol-container">
                            <label class="form-label" id="tol-label">Tolerance</label>
                            <input type="number" step="any" min="0" class="form-control" id="tol" required>
                        </div>

                        <div class="col-md-6" id="iter-container">
                            <label class="form-label" id="iter-label">Max Iterations</label>
                            <input type="number" step="1" min="1" class="form-control" id="iter" required>
                        </div>

                        <div class="col-md-12 d-flex justify-content-center" id="btn-container">
                            <button class="btn btn-success" onclick ="GetTheResult()" id="calculate-btn">Calculate</button>
                        </div>`;
  refreshInputs();
  methodCases();
}

function getTheMethodValue() {
  return methodSelect.value;
}
function reset() {
  tableBody.innerHTML = "";
  tableHead.innerHTML = "";
  resultBox.innerHTML =
    "The calculated roots or variable values will appear here after clicking Calculate";
  fx.value = "";
  dfx.value = "";
  gx.value = "";

  xl.value = "";
  xu.value = "";

  x0.value = "";
  x1.value = "";

  tol.value = "";
  iter.value = "";
}
function methodCases() {
  if (!document.getElementById("fx")) return;

  if (getTheMethodValue() === "1" || getTheMethodValue() === "2") {
    xl.style.display = "block";
    xlLabel.style.display = "block";
    xu.style.display = "block";
    xuLabel.style.display = "block";
    dfx.style.display = "none";
    dfxLabel.style.display = "none";
    gx.style.display = "none";
    gxLabel.style.display = "none";
    x0.style.display = "none";
    x0Label.style.display = "none";
    x1.style.display = "none";
    x1Label.style.display = "none";
    reset();
  } else if (getTheMethodValue() === "3") {
    gx.style.display = "block";
    gxLabel.style.display = "block";

    x0.style.display = "block";
    x0Label.style.display = "block";

    xl.style.display = "none";
    xlLabel.style.display = "none";

    xu.style.display = "none";
    xuLabel.style.display = "none";
    dfx.style.display = "none";
    dfxLabel.style.display = "none";
    reset();
  } else if (getTheMethodValue() === "4") {
    dfx.style.display = "block";
    dfxLabel.style.display = "block";
    x0.style.display = "block";
    x0Label.style.display = "block";

    gx.style.display = "none";
    gxLabel.style.display = "none";

    xl.style.display = "none";
    xlLabel.style.display = "none";

    xu.style.display = "none";
    xuLabel.style.display = "none";
    reset();
  } else if (getTheMethodValue() === "5") {
    x0.style.display = "block";
    x0Label.style.display = "block";
    x1.style.display = "block";
    x1Label.style.display = "block";

    dfx.style.display = "none";
    dfxLabel.style.display = "none";

    gx.style.display = "none";
    gxLabel.style.display = "none";

    xl.style.display = "none";
    xlLabel.style.display = "none";

    xu.style.display = "none";
    xuLabel.style.display = "none";
    reset();
  }
}
methodCases();
methodSelect.addEventListener("change", function () {
  console.log(methodSelect.value);
  if (document.getElementById("fx")) {
    methodCases();
  } else {
    let inputs = document.querySelectorAll("#inputs-row input");
    inputs.forEach(inp => inp.value = "");
    let resultBox = document.getElementById("result-box");
    if (resultBox) resultBox.innerHTML = "The calculated roots or variable values will appear here after clicking Calculate";
  }
});

function parseFunction(funcStr) {
  funcStr = funcStr.replace(/\^/g, "**");
  funcStr = funcStr.replace(/(\d)(x)/g, "$1*$2");
  funcStr = funcStr.replace(/x/g, "(x)");

  funcStr = funcStr.replace(/sqrt/g, "Math.sqrt");
  funcStr = funcStr.replace(/sin/g, "Math.sin");
  funcStr = funcStr.replace(/cos/g, "Math.cos");
  funcStr = funcStr.replace(/tan/g, "Math.tan");
  funcStr = funcStr.replace(/log/g, "Math.log");
  funcStr = funcStr.replace(/exp/g, "Math.exp");

  return new Function("x", "return " + funcStr);
}
function bisect(funcStr, xl, xu, tol, maxIter = null) {
  let func = parseFunction(funcStr);

  if (func(xl) * func(xu) >= 0) return "Invalid interval";

  let xr = 0;
  let i = 0;

  while (true) {
    let xrOld = xr;
    xr = (xl + xu) / 2;

    let fxl = func(xl);
    let fxu = func(xu);
    let fxr = func(xr);

    let error = i === 0 ? 100 : Math.abs((xr - xrOld) / xr) * 100;
    let row = `
  <tr>
    <td>${i}</td>
    <td>${xl.toFixed(3)}</td>
    <td>${fxl.toFixed(3)}</td>
    <td>${xu.toFixed(3)}</td>
    <td>${fxu.toFixed(3)}</td>
    <td>${xr.toFixed(3)}</td>
    <td>${fxr.toFixed(3)}</td>
    <td>${error.toFixed(3)}</td>
  </tr>
`;

    tableBody.innerHTML += row;

    if (i > 0 && error <= tol) {
      return `Root = ${xr.toFixed(3)} (in ${i + 1} iterations)`;
    }

    if (maxIter !== null && i >= maxIter - 1) {
      return `Root ≈ ${xr.toFixed(3)} (Stopped at maxIter = ${maxIter})`;
    }

    if (func(xl) * func(xr) < 0) {
      xu = xr;
    } else {
      xl = xr;
    }

    i++;
  }
}
function falsePosition(funcStr, xl, xu, tol, maxIter = null) {
  let func = parseFunction(funcStr);

  if (func(xl) * func(xu) >= 0) return "Invalid interval";

  let xr = 0;
  let i = 0;

  while (true) {
    let xrOld = xr;
    let fxl = func(xl);
    let fxu = func(xu);
    xr = xu - (fxu * (xl - xu)) / (fxl - fxu);
    let fxr = func(xr);

    let error = i === 0 ? 100 : Math.abs((xr - xrOld) / xr) * 100;
    let row = `
  <tr>
    <td>${i}</td>
    <td>${xl.toFixed(3)}</td>
    <td>${fxl.toFixed(3)}</td>
    <td>${xu.toFixed(3)}</td>
    <td>${fxu.toFixed(3)}</td>
    <td>${xr.toFixed(3)}</td>
    <td>${fxr.toFixed(3)}</td>
    <td>${error.toFixed(3)}</td>
  </tr>
`;

    tableBody.innerHTML += row;

    if (i > 0 && error <= tol) {
      return `Root = ${xr.toFixed(3)} (in ${i + 1} iterations)`;
    }

    if (maxIter !== null && i >= maxIter - 1) {
      return `Root ≈ ${xr.toFixed(3)} (Stopped at maxIter = ${maxIter})`;
    }

    if (func(xl) * func(xr) < 0) {
      xu = xr;
    } else {
      xl = xr;
    }

    i++;
  }
}
function fixedPoint(gStr, x0, tol, maxIter = null) {
  let g = parseFunction(gStr);

  let xi = x0;
  let xiPlus1 = 0;
  let i = 0;

  while (true) {
    xiPlus1 = g(xi);

    let error = i === 0 ? 100 : Math.abs((xiPlus1 - xi) / xiPlus1) * 100;

    let row = `
      <tr>
        <td>${i}</td>
        <td>${xi.toFixed(3)}</td>
        <td>${xiPlus1.toFixed(3)}</td>
        <td>${error.toFixed(3)}</td>
      </tr>
    `;

    tableBody.innerHTML += row;

    if (i > 0 && error <= tol) {
      return `Root = ${xiPlus1.toFixed(3)} (in ${i + 1} iterations)`;
    }

    if (maxIter !== null && i >= maxIter - 1) {
      return `Root ≈ ${xiPlus1.toFixed(3)} (Stopped at maxIter = ${maxIter})`;
    }

    xi = xiPlus1;
    i++;
  }
}
function newton(funcStr, dfuncStr, x0, tol, maxIter = null) {
  let f = parseFunction(funcStr);
  let df = parseFunction(dfuncStr);

  let xi = x0;
  let xiPlus1 = 0;
  let i = 0;

  while (true) {
    let fxi = f(xi);
    let dfxi = df(xi);

    if (dfxi === 0) return "Error: f'(xi) = 0 (division by zero)";

    xiPlus1 = xi - fxi / dfxi;

    let error = i === 0 ? 100 : Math.abs((xiPlus1 - xi) / xiPlus1) * 100;

    let row = `
      <tr>
        <td>${i}</td>
        <td>${xi.toFixed(3)}</td>
        <td>${fxi.toFixed(3)}</td>
        <td>${dfxi.toFixed(3)}</td>
        <td>${xiPlus1.toFixed(3)}</td>
        <td>${error.toFixed(3)}</td>
      </tr>
    `;

    tableBody.innerHTML += row;

    if (i > 0 && error <= tol) {
      return `Root = ${xiPlus1.toFixed(3)} (in ${i + 1} iterations)`;
    }

    if (maxIter !== null && i >= maxIter - 1) {
      return `Root ≈ ${xiPlus1.toFixed(3)} (Stopped at maxIter = ${maxIter})`;
    }

    xi = xiPlus1;
    i++;
  }
}
function secant(funcStr, x0, x1, tol, maxIter = null) {
  let func = parseFunction(funcStr);

  let xiMinus1 = x0;
  let xi = x1;
  let xiPlus1 = 0;

  let i = 0;

  while (true) {
    let f_xi = func(xi);
    let f_xiMinus1 = func(xiMinus1);
    if (f_xi - f_xiMinus1 === 0) {
      return "Error: Division by zero";
    }

    xiPlus1 = xi - (f_xi * (xiMinus1 - xi)) / (f_xiMinus1 - f_xi);
    let error = i === 0 ? 100 : Math.abs((xiPlus1 - xi) / xiPlus1) * 100;
    let row = `
      <tr>
        <td>${i}</td>
        <td>${xiMinus1.toFixed(3)}</td>
        <td>${xi.toFixed(3)}</td>
        <td>${xiPlus1.toFixed(3)}</td>
        <td>${f_xi.toFixed(3)}</td>
        <td>${error.toFixed(3)}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
    if (i > 0 && error <= tol) {
      return `Root = ${xiPlus1.toFixed(3)} (in ${i + 1} iterations)`;
    }
    if (maxIter !== null && i >= maxIter - 1) {
      return `Root ≈ ${xiPlus1.toFixed(3)} (Stopped at maxIter = ${maxIter})`;
    }
    xiMinus1 = xi;
    xi = xiPlus1;

    i++;
  }
}
function setError(input, message) {
  input.classList.add("input-error");

  let errorSpan = input.nextElementSibling;

  if (!errorSpan || !errorSpan.classList.contains("error-message")) {
    errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message");
    input.parentNode.appendChild(errorSpan);
  }

  errorSpan.textContent = message;
}
function validateInputs() {
  let method = getTheMethodValue();

  let tolValue = tol.value.trim();
  let iterValue = iter.value.trim();

  let isValid = true;

  // clear old errors
  [fx, dfx, gx, xl, xu, x0, x1, tol, iter].forEach(clearError);

  if (tolValue === "" && iterValue === "") {
    setError(tol, "Enter tolerance or iterations");
    setError(iter, "Enter tolerance or iterations");
    isValid = false;
  }

  // ===== Method 1 & 2 =====
  if (method === "1" || method === "2") {
    if (fx.value.trim() === "") {
      setError(fx, "fx is required");
      isValid = false;
    }
    if (xl.value.trim() === "") {
      setError(xl, "xl is required");
      isValid = false;
    }
    if (xu.value.trim() === "") {
      setError(xu, "xu is required");
      isValid = false;
    }
  }

  // ===== Method 3 =====
  if (method === "3") {
    if (gx.value.trim() === "") {
      setError(gx, "g(x) is required");
      isValid = false;
    }
    if (x0.value.trim() === "") {
      setError(x0, "x0 is required");
      isValid = false;
    }
  }

  // ===== Method 4 =====
  if (method === "4") {
    if (fx.value.trim() === "") {
      setError(fx, "fx is required");
      isValid = false;
    }
    if (dfx.value.trim() === "") {
      setError(dfx, "f'(x) is required");
      isValid = false;
    }
    if (x0.value.trim() === "") {
      setError(x0, "x0 is required");
      isValid = false;
    }
  }

  // ===== Method 5 =====
  if (method === "5") {
    if (fx.value.trim() === "") {
      setError(fx, "fx is required");
      isValid = false;
    }
    if (x0.value.trim() === "") {
      setError(x0, "x0 is required");
      isValid = false;
    }
    if (x1.value.trim() === "") {
      setError(x1, "x1 is required");
      isValid = false;
    }
  }

  return isValid;
}
function clearError(input) {
  input.classList.remove("input-error");

  let errorSpan = input.nextElementSibling;
  if (errorSpan && errorSpan.classList.contains("error-message")) {
    errorSpan.textContent = "";
  }
}
function GetTheResult() {
  if (!validateInputs()) return;
  tableBody.innerHTML = "";
  resultBox.innerHTML = "";
  if (getTheMethodValue() === "1") {
    tableHead.innerHTML = `<th >iter</th>
      <th>xl</th>
      <th>f(xl)</th>
      <th>xu</th>
      <th>f(xu)</th>
      <th>xr</th>
      <th>f(xr)</th>
      <th>error</th>
   `;
    let maxIterValue = iter.value.trim() === "" ? null : Number(iter.value);

    let result = bisect(
      fx.value,
      Number(xl.value),
      Number(xu.value),
      Number(tol.value),
      maxIterValue,
    );

    resultBox.innerHTML = result;
  } else if (getTheMethodValue() === "2") {
    tableHead.innerHTML = `<th >iter</th>
      <th>xl</th>
      <th>f(xl)</th>
      <th>xu</th>
      <th>f(xu)</th>
      <th>xr</th>
      <th>f(xr)</th>
      <th>error</th>
   `;
    let maxIterValue = iter.value.trim() === "" ? null : Number(iter.value);

    let result = falsePosition(
      fx.value,
      Number(xl.value),
      Number(xu.value),
      Number(tol.value),
      maxIterValue,
    );

    resultBox.innerHTML = result;
  } else if (getTheMethodValue() === "3") {
    tableHead.innerHTML = `<th>iter</th>
    <th>Xi</th>
    <th>Xi+1</th>
    <th>error</th>
  `;

    let maxIterValue = iter.value.trim() === "" ? null : Number(iter.value);

    let result = fixedPoint(
      gx.value,
      Number(x0.value),
      Number(tol.value),
      maxIterValue,
    );

    resultBox.innerHTML = result;
  } else if (getTheMethodValue() === "4") {
    tableHead.innerHTML = `<th>iter</th>
    <th>Xi</th>
    <th>F(Xi)</th>
    <th>F'(Xi)</th>
    <th>Xi+1</th>
    <th>error</th>
  `;

    let maxIterValue = iter.value.trim() === "" ? null : Number(iter.value);

    let result = newton(
      fx.value,
      dfx.value,
      Number(x0.value),
      Number(tol.value),
      maxIterValue,
    );

    resultBox.innerHTML = result;
  } else if (getTheMethodValue() === "5") {
    tableHead.innerHTML = `
    <th>iter</th>
    <th>Xi-1</th>
    <th>Xi</th>
    <th>Xi+1</th>
    <th>f(Xi)</th>
    <th>error</th>
  `;

    let maxIterValue = iter.value.trim() === "" ? null : Number(iter.value);

    let result = secant(
      fx.value,
      Number(x0.value),
      Number(x1.value),
      Number(tol.value),
      maxIterValue,
    );

    resultBox.innerHTML = result;
  }

}

// LINEAR METHODS ONLY
// ==========================

function getMatrix() {
  let inputs = document.querySelectorAll("#inputs-row input");

  let values = Array.from(inputs).map(inp => Number(inp.value));

  // if Input Is Empty
  if (values.slice(0, 12).some(v => isNaN(v))) {
    return null;
  }

  return {
    A: [
      [values[0], values[1], values[2]],
      [values[4], values[5], values[6]],
      [values[8], values[9], values[10]]
    ],
    B: [values[3], values[7], values[11]]
  };
}


// GAUSS ELIMINATION

function gauss(A, B) {

  let n = 3;

  for (let i = 0; i < n; i++) {

    for (let j = i + 1; j < n; j++) {
      let factor = A[j][i] / A[i][i];

      for (let k = i; k < n; k++) {
        A[j][k] -= factor * A[i][k];
      }

      B[j] -= factor * B[i];
    }
  }

  let x = Array(n);

  for (let i = n - 1; i >= 0; i--) {
    let sum = B[i];

    for (let j = i + 1; j < n; j++) {
      sum -= A[i][j] * x[j];
    }

    x[i] = sum / A[i][i];
  }

  return x;
}


// GAUSS JORDAN

function gaussJordan(A, B) {

  let n = 3;

  for (let i = 0; i < n; i++) {

    let pivot = A[i][i];

    for (let j = 0; j < n; j++) {
      A[i][j] /= pivot;
    }

    B[i] /= pivot;

    for (let k = 0; k < n; k++) {
      if (k !== i) {

        let factor = A[k][i];

        for (let j = 0; j < n; j++) {
          A[k][j] -= factor * A[i][j];
        }

        B[k] -= factor * B[i];
      }
    }
  }

  return B;
}


// CRAMER RULE

function det3(m) {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}

function cramer(A, B) {

  let D = det3(A);

  if (D === 0) return null;

  let A1 = JSON.parse(JSON.stringify(A));
  let A2 = JSON.parse(JSON.stringify(A));
  let A3 = JSON.parse(JSON.stringify(A));

  for (let i = 0; i < 3; i++) {
    A1[i][0] = B[i];
    A2[i][1] = B[i];
    A3[i][2] = B[i];
  }

  return [
    det3(A1) / D,
    det3(A2) / D,
    det3(A3) / D
  ];
}


// LU DECOMPOSITION
function lu(A, B) {
  console.log("Starting LU Decomposition");
  let n = 3;

  let L = Array.from({ length: n }, () => Array(n).fill(0));
  let U = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {

    for (let k = i; k < n; k++) {
      let sum = 0;
      for (let j = 0; j < i; j++) sum += L[i][j] * U[j][k];
      U[i][k] = A[i][k] - sum;
    }


    for (let k = i; k < n; k++) {
      if (i === k) {
        L[i][i] = 1;
      } else {
        if (U[i][i] === 0) {
          console.error("LU Decomposition Error: Division by zero at pivot U[" + i + "][" + i + "]");
          return null;
        }
        let sum = 0;
        for (let j = 0; j < i; j++) sum += L[k][j] * U[j][i];
        L[k][i] = (A[k][i] - sum) / U[i][i];
      }
    }
  }

  console.log("L Matrix:", L);
  console.log("U Matrix:", U);


  let y = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let sum = B[i];
    for (let j = 0; j < i; j++) sum -= L[i][j] * y[j];
    y[i] = sum / L[i][i];
  }
  console.log("y Vector:", y);


  let x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = y[i];
    for (let j = i + 1; j < n; j++) sum -= U[i][j] * x[j];
    if (U[i][i] === 0) {
      console.error("LU Decomposition Error: Division by zero during back substitution");
      return null;
    }
    x[i] = sum / U[i][i];
  }
  console.log("x Vector:", x);

  return x;
}

function showError(msg) {
  let resultBox = document.getElementById("result-box");
  if (resultBox) resultBox.innerHTML = `<span class="text-danger fw-bold">${msg}</span>`;
}

function showResult(msg) {
  let resultBox = document.getElementById("result-box");
  if (resultBox) resultBox.innerHTML = msg;
}

function solveLinear() {
  let data = getMatrix();

  if (!data) {
    showError("Enter valid matrix values");
    return;
  }

  let method = document.getElementById("method-select").value;


  let A_copy = JSON.parse(JSON.stringify(data.A));
  let B_copy = [...data.B];

  let result;

  if (method == "1") result = gauss(A_copy, B_copy);
  else if (method == "2") result = gaussJordan(A_copy, B_copy);
  else if (method == "3") result = cramer(A_copy, B_copy);
  else if (method == "4") result = lu(A_copy, B_copy);

  if (!result) {
    showError("No solution");
    return;
  }

  showResult(
    `x1 = ${result[0].toFixed(3)}<br>
     x2 = ${result[1].toFixed(3)}<br>
     x3 = ${result[2].toFixed(3)}`
  );
}