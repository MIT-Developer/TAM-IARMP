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
    [Route("api/TbMComInputs")]
    public class TbMComInputsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbMComInputsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbMComInputs
        [HttpGet]
        public IEnumerable<TbMComInput> GetTbMComInput()
        {
            return _context.TbMComInput;
        }

        // GET: api/TbMComInputs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbMComInput([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMComInput = await _context.TbMComInput.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbMComInput == null)
            {
                return NotFound();
            }

            return Ok(tbMComInput);
        }

        // PUT: api/TbMComInputs/5
        [HttpPut]
        public async Task<IActionResult> PutTbMComInput([FromRoute] short id, [FromBody] TbMComInput tbMComInput)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

         
            _context.Entry(tbMComInput).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMComInputExists(id))
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

        // POST: api/TbMComInputs
        [HttpPost]
        public async Task<IActionResult> PostTbMComInput([FromBody] TbMComInput tbMComInput)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbMComInput.Add(tbMComInput);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMComInputExists(tbMComInput.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMComInput", new { id = tbMComInput.YearActive }, tbMComInput);
        }

        // DELETE: api/TbMComInputs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMComInput([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMComInput = await _context.TbMComInput.SingleOrDefaultAsync(m => m.YearActive == id);
            if (tbMComInput == null)
            {
                return NotFound();
            }

            _context.TbMComInput.Remove(tbMComInput);
            await _context.SaveChangesAsync();

            return Ok(tbMComInput);
        }

        private bool TbMComInputExists(short id)
        {
            return _context.TbMComInput.Any(e => e.YearActive == id);
        }
    }
}