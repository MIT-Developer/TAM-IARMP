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
    [Route("api/TbMDivDepts")]
    public class TbMDivDeptsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbMDivDeptsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbMDivDepts
        [HttpGet]
        public IEnumerable<TbMDivDept> GetTbMDivDept()
        {
            return _context.TbMDivDept;
        }

        // GET: api/TbMDivDepts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbMDivDept([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMDivDept = await _context.TbMDivDept.SingleOrDefaultAsync(m => m.KodeDivisi == id);

            if (tbMDivDept == null)
            {
                return NotFound();
            }

            return Ok(tbMDivDept);
        }

        // PUT: api/TbMDivDepts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMDivDept([FromRoute] string id, [FromBody] TbMDivDept tbMDivDept)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbMDivDept.KodeDivisi)
            {
                return BadRequest();
            }

            _context.Entry(tbMDivDept).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMDivDeptExists(id))
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

        // POST: api/TbMDivDepts
        [HttpPost]
        public async Task<IActionResult> PostTbMDivDept([FromBody] TbMDivDept tbMDivDept)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbMDivDept.Add(tbMDivDept);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMDivDeptExists(tbMDivDept.KodeDivisi))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMDivDept", new { id = tbMDivDept.KodeDivisi }, tbMDivDept);
        }

        // DELETE: api/TbMDivDepts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMDivDept([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMDivDept = await _context.TbMDivDept.SingleOrDefaultAsync(m => m.KodeDivisi == id);
            if (tbMDivDept == null)
            {
                return NotFound();
            }

            _context.TbMDivDept.Remove(tbMDivDept);
            await _context.SaveChangesAsync();

            return Ok(tbMDivDept);
        }

        private bool TbMDivDeptExists(string id)
        {
            return _context.TbMDivDept.Any(e => e.KodeDivisi == id);
        }
    }
}