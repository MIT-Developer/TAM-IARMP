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
    [Route("api/TbMDeptInputs")]
    public class TbMDeptInputsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbMDeptInputsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbMDeptInputs
        [HttpGet]
        public IEnumerable<TbMDeptInput> GetTbMDeptInput()
        {
            return _context.TbMDeptInput;
        }

        // GET: api/TbMDeptInputs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbMDeptInput([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMDeptInput = await _context.TbMDeptInput.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbMDeptInput == null)
            {
                return NotFound();
            }

            return Ok(tbMDeptInput);
        }

        // PUT: api/TbMDeptInputs/5
        [HttpPut]
        public async Task<IActionResult> PutTbMDeptInput([FromRoute] short id, [FromBody] TbMDeptInput tbMDeptInput)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            _context.Entry(tbMDeptInput).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMDeptInputExists(id))
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

        // POST: api/TbMDeptInputs
        [HttpPost]
        public async Task<IActionResult> PostTbMDeptInput([FromBody] TbMDeptInput tbMDeptInput)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbMDeptInput.Add(tbMDeptInput);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMDeptInputExists(tbMDeptInput.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMDeptInput", new { id = tbMDeptInput.YearActive }, tbMDeptInput);
        }

        // DELETE: api/TbMDeptInputs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMDeptInput([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMDeptInput = await _context.TbMDeptInput.SingleOrDefaultAsync(m => m.YearActive == id);
            if (tbMDeptInput == null)
            {
                return NotFound();
            }

            _context.TbMDeptInput.Remove(tbMDeptInput);
            await _context.SaveChangesAsync();

            return Ok(tbMDeptInput);
        }

        [HttpPost("deletecontrol")]
        public async Task<IActionResult> DeleteTbMDeptInput([FromBody] TbMDeptInput controlDelete)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMDeptInput = await
            _context.TbMDeptInput.SingleOrDefaultAsync(e => e.YearActive == controlDelete.YearActive && e.DeptInpId == controlDelete.DeptInpId);
            if (tbMDeptInput == null)
            {
                return NotFound();
            }

            _context.TbMDeptInput.Remove(tbMDeptInput);
            await _context.SaveChangesAsync();

            return Ok(tbMDeptInput);
        }

        private bool TbMDeptInputExists(short id)
        {
            return _context.TbMDeptInput.Any(e => e.YearActive == id);
        }
    }
}