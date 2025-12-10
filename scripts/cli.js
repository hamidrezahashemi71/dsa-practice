/**
 * Interactive CLI to run algorithms from the console.
 * Run with: npm run cli
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Discover all algorithms in src/algorithms/
function discoverAlgorithms () {
  const algorithmsDir = path.join(__dirname, '../src/algorithms');
  const files = fs.readdirSync(algorithmsDir).filter(f => f.endsWith('.js'));
  
  const algorithms = [];
  
  for (const file of files) {
    const filePath = path.join(algorithmsDir, file);
    const module = require(filePath);
    const exports = Object.keys(module);
    
    for (const exportName of exports) {
      algorithms.push({
        name: exportName,
        fn: module[exportName],
        file: file,
        filePath: filePath
      });
    }
  }
  
  return algorithms;
}

// Parse user-provided arguments safely.
// Accepts either a JSON array (preferred) or a comma-separated JS expression list.
function parseArgs (raw) {
  const trimmed = raw.trim();
  // Try JSON array first
  try {
    const asJson = JSON.parse(trimmed);
    if (Array.isArray(asJson)) return asJson;
  } catch (_) {}

  // Fallback: wrap as array and eval (allows JS literals)
  try {
    // eslint-disable-next-line no-eval
    const asEval = eval(`[${trimmed}]`);
    if (Array.isArray(asEval)) return asEval;
  } catch (_) {}

  throw new Error('Could not parse input. Use JSON array syntax, e.g. ["a", "b"], "Sara" => ["a","b","c","Sara"]');
}

// Format output nicely
function formatOutput (result) {
  if (result === undefined) return 'undefined';
  if (result === null) return 'null';
  if (typeof result === 'object') {
    return JSON.stringify(result, null, 2);
  }
  return String(result);
}

// Show menu and get selection
function showMenu (algorithms) {
  console.log('\n=== Available Algorithms ===\n');
  algorithms.forEach((alg, index) => {
    console.log(`${index + 1}. ${alg.name} (from ${alg.file})`);
  });
  console.log(`0. Exit\n`);
}

// Get input for algorithm
function getAlgorithmInput (algorithmName, callback) {
  console.log(`\nEnter input for ${algorithmName}:`);
  console.log('Preferred: provide a JSON array of arguments.');
  console.log('Examples:');
  console.log('  ["Jixer","Sara","Hamidrez"], "Sara"   => ["Jixer","Sara","Hamidrez","Sara"]');
  console.log('  [["a","b","c"], "b"]                 => [["a","b","c"],"b"]');
  console.log('Enter: ["Jixer","Sara","Hamidrez","Saba","Erfan"], "Sara"\n');
  
  rl.question('Input: ', (answer) => {
    try {
      const args = parseArgs(answer);
      callback(null, args);
    } catch (error) {
      callback(error, null);
    }
  });
}

// Run selected algorithm
function runAlgorithm (algorithm) {
  getAlgorithmInput(algorithm.name, (error, args) => {
    if (error) {
      console.error(`\n❌ Error parsing input: ${error.message}\n`);
      promptUser();
      return;
    }
    
    try {
      console.log(`\n📊 Running ${algorithm.name}(${args.map(a => JSON.stringify(a)).join(', ')})...\n`);
      const start = Date.now();
      const result = algorithm.fn(...args);
      const duration = Date.now() - start;
      
      console.log('✅ Result:');
      console.log(formatOutput(result));
      console.log(`\n⏱️  Execution time: ${duration} ms\n`);
    } catch (error) {
      console.error(`\n❌ Error: ${error.message}\n`);
      if (error.stack) {
        console.error(error.stack);
      }
    }
    
    promptUser();
  });
}

// Main prompt
function promptUser () {
  const algorithms = discoverAlgorithms();
  
  if (algorithms.length === 0) {
    console.log('No algorithms found in src/algorithms/');
    rl.close();
    return;
  }
  
  showMenu(algorithms);
  
  rl.question('Select an algorithm (number): ', (answer) => {
    const choice = parseInt(answer.trim());
    
    if (choice === 0) {
      console.log('\n👋 Goodbye!\n');
      rl.close();
      return;
    }
    
    if (isNaN(choice) || choice < 1 || choice > algorithms.length) {
      console.log('\n❌ Invalid selection. Please try again.\n');
      promptUser();
      return;
    }
    
    const selected = algorithms[choice - 1];
    runAlgorithm(selected);
  });
}

// Start CLI
console.log('\n🚀 DSA Practice CLI\n');
promptUser();

