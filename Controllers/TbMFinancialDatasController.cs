using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tam_risk_project.Models;

namespace tam_risk_project.Controllers
{
    [Produces("application/json")]
    [Route("api/TbMFinancialDatas")]
    public class TbMFinancialDatasController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbMFinancialDatasController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbMFinancialDatas
        [HttpGet]
        public IEnumerable<TbMFinancialData> GetTbMFinancialData()
        {
            return _context.TbMFinancialData;
        }

        // GET: api/TbMFinancialDatas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbMFinancialData([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMFinancialData = await _context.TbMFinancialData.SingleOrDefaultAsync(m => m.Year == id);

            if (tbMFinancialData == null)
            {
                return NotFound();
            }

            return Ok(tbMFinancialData);
        }

        // PUT: api/TbMFinancialDatas/5
        [HttpPut]
        public async Task<IActionResult> PutTbMFinancialData([FromRoute] short id, [FromBody] TbMFinancialData tbMFinancialData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            _context.Entry(tbMFinancialData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMFinancialDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TbMFinancialDatas
        [HttpPost]
        public async Task<IActionResult> PostTbMFinancialData([FromBody] TbMFinancialData tbMFinancialData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbMFinancialData.Add(tbMFinancialData);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMFinancialDataExists(tbMFinancialData.Year))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMFinancialData", new { id = tbMFinancialData.Year }, tbMFinancialData);
        }

        // DELETE: api/TbMFinancialDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMFinancialData([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMFinancialData = await _context.TbMFinancialData.SingleOrDefaultAsync(m => m.Year == id);
            if (tbMFinancialData == null)
            {
                return NotFound();
            }

            _context.TbMFinancialData.Remove(tbMFinancialData);
            await _context.SaveChangesAsync();

            return Ok(tbMFinancialData);
        }

        private bool TbMFinancialDataExists(short id)
        {
            return _context.TbMFinancialData.Any(e => e.Year == id);
        }
    }
}