class ExcelExportPlus {
    constructor() {
        this.initialized = false;
        this.loadDependencies();
    }

    async loadDependencies() {
        if (!window.XLSX) {
            await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js');
        }
        this.initialized = true;
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async export(selector = 'table', filename = 'exported_data') {
        // Wait for dependencies to load if not already loaded
        if (!this.initialized) {
            await this.loadDependencies();
        }
    
        try {
            // Get all selected tables
            const tables = document.querySelectorAll(selector);
    
            if (tables.length === 0) {
                throw new Error('No table found with the given selector');
            }
    
            // Create new workbook
            const wb = XLSX.utils.book_new();
    
            // Process each table
            tables.forEach((table, index) => {
                // Convert table to worksheet
                const ws = XLSX.utils.table_to_sheet(table);
    
                // Auto-size columns
                const range = XLSX.utils.decode_range(ws['!ref']);
                const cols = [];
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    let max = 0;
                    for (let R = range.s.r; R <= range.e.r; ++R) {
                        const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
                        if (cell && cell.v) {
                            const length = cell.v.toString().length;
                            if (length > max) max = length;
                        }
                    }
                    cols[C] = { wch: max + 2 };
                }
                ws['!cols'] = cols;
    
                // Add worksheet to workbook with unique sheet name
                const sheetName = `Sheet${index + 1}`;
                XLSX.utils.book_append_sheet(wb, ws, sheetName);
            });
    
            // Export workbook
            XLSX.writeFile(wb, `${filename}.xlsx`);
    
            return true;
        } catch (error) {
            console.error('Export failed:', error);
            return false;
        }
    }
    
}

window.excelExport = new ExcelExportPlus();
